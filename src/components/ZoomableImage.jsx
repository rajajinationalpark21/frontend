import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

const MAX_SCALE = 4;
const TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;

const clampValue = (value, limit) => Math.max(-limit, Math.min(limit, value));

/**
 * An image that zooms in place: double-tap or double-click zooms into that
 * spot (again to zoom out), pinch and drag on touch screens, the wheel zooms
 * while zoomed, and the + / − buttons work everywhere. The page keeps
 * scrolling normally until the image is zoomed.
 */
export default function ZoomableImage({ src, alt, className = '' }) {
  const frameRef = useRef(null);
  const [view, setViewState] = useState({ scale: 1, x: 0, y: 0 });
  // Gesture handlers read the latest view without waiting for a re-render.
  const viewRef = useRef(view);
  const setView = (next) => {
    viewRef.current = next;
    setViewState(next);
  };
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const lastTap = useRef({ time: 0, x: 0, y: 0 });

  // Keeps the zoomed image covering the frame (no empty edges).
  const clampView = (next) => {
    const frame = frameRef.current;
    if (!frame || next.scale <= 1) return { scale: 1, x: 0, y: 0 };
    const limitX = (frame.clientWidth * (next.scale - 1)) / 2;
    const limitY = (frame.clientHeight * (next.scale - 1)) / 2;
    return { scale: next.scale, x: clampValue(next.x, limitX), y: clampValue(next.y, limitY) };
  };

  // Point relative to the frame's centre (the transform origin).
  const pointInFrame = (clientX, clientY) => {
    const rect = frameRef.current.getBoundingClientRect();
    return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 };
  };

  // Zoom to `scale` keeping the image point under `point` where it is.
  const zoomAt = (scale, point, from = viewRef.current) => {
    const next = Math.max(1, Math.min(MAX_SCALE, scale));
    setView(clampView({
      scale: next,
      x: point.x - (next * (point.x - from.x)) / from.scale,
      y: point.y - (next * (point.y - from.y)) / from.scale,
    }));
  };

  const toggleZoomAt = (point) => {
    if (viewRef.current.scale > 1) setView({ scale: 1, x: 0, y: 0 });
    else zoomAt(TAP_ZOOM, point);
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = [...pointers.current.values()];

    if (points.length === 2) {
      const [a, b] = points;
      gesture.current = {
        type: 'pinch',
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        mid: pointInFrame((a.x + b.x) / 2, (a.y + b.y) / 2),
        start: viewRef.current,
      };
      return;
    }

    const now = Date.now();
    const tap = lastTap.current;
    if (now - tap.time < DOUBLE_TAP_MS && Math.hypot(event.clientX - tap.x, event.clientY - tap.y) < 30) {
      lastTap.current = { time: 0, x: 0, y: 0 };
      toggleZoomAt(pointInFrame(event.clientX, event.clientY));
      gesture.current = null;
      return;
    }
    lastTap.current = { time: now, x: event.clientX, y: event.clientY };

    if (viewRef.current.scale > 1) {
      event.currentTarget.setPointerCapture?.(event.pointerId);
      gesture.current = { type: 'pan', x: event.clientX, y: event.clientY, start: viewRef.current };
    }
  };

  const onPointerMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const current = gesture.current;
    if (!current) return;

    if (current.type === 'pinch') {
      const [a, b] = [...pointers.current.values()];
      if (!b) return;
      const scale = current.start.scale * (Math.hypot(a.x - b.x, a.y - b.y) / current.distance);
      zoomAt(scale, current.mid, current.start);
    } else if (current.type === 'pan') {
      setView(clampView({
        scale: current.start.scale,
        x: current.start.x + (event.clientX - current.x),
        y: current.start.y + (event.clientY - current.y),
      }));
    }
  };

  const onPointerUp = (event) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2 && gesture.current?.type === 'pinch') gesture.current = null;
    if (pointers.current.size === 0) gesture.current = null;
  };

  // Wheel zoom only while zoomed, so the page still scrolls past the map.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const onWheel = (event) => {
      if (viewRef.current.scale <= 1 && !event.ctrlKey) return;
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0015);
      zoomAt(viewRef.current.scale * factor, pointInFrame(event.clientX, event.clientY));
    };
    frame.addEventListener('wheel', onWheel, { passive: false });
    return () => frame.removeEventListener('wheel', onWheel);
  }, []);

  const onKeyDown = (event) => {
    const centre = { x: 0, y: 0 };
    if (event.key === '+' || event.key === '=') zoomAt(viewRef.current.scale * 1.5, centre);
    else if (event.key === '-') zoomAt(viewRef.current.scale / 1.5, centre);
    else if (event.key === '0' || event.key === 'Escape') setView({ scale: 1, x: 0, y: 0 });
    else return;
    event.preventDefault();
  };

  const zoomed = view.scale > 1;
  const buttonClass =
    'w-9 h-9 rounded-full bg-white/95 dark:bg-[#0c1f13]/95 text-emerald-900 dark:text-emerald-100 border border-emerald-900/15 shadow-md flex items-center justify-center hover:bg-emerald-50 disabled:opacity-40 transition';

  return (
    <div className={`relative ${className}`}>
      <div
        ref={frameRef}
        role="img"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(event) => event.preventDefault()}
        className={`overflow-hidden rounded-2xl bg-white select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
          zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
        }`}
        style={{ touchAction: zoomed ? 'none' : 'pan-y' }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          decoding="async"
          className="w-full h-auto block will-change-transform transition-transform duration-150 ease-out motion-reduce:transition-none"
          style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }}
        />
      </div>

      <div className="absolute right-3 bottom-3 flex flex-col gap-2">
        <button type="button" className={buttonClass} aria-label="Zoom in" disabled={view.scale >= MAX_SCALE}
          onClick={() => zoomAt(view.scale * 1.5, { x: 0, y: 0 })}>
          <Plus className="w-4 h-4" />
        </button>
        <button type="button" className={buttonClass} aria-label="Zoom out" disabled={!zoomed}
          onClick={() => zoomAt(view.scale / 1.5, { x: 0, y: 0 })}>
          <Minus className="w-4 h-4" />
        </button>
        <button type="button" className={buttonClass} aria-label="Reset zoom" disabled={!zoomed}
          onClick={() => setView({ scale: 1, x: 0, y: 0 })}>
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
