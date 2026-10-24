import React from 'react';

/**
 * An FAQ answer that slides open and closed (height and fade) instead of
 * appearing at once. Closed answers stay in the page for search engines but are
 * hidden from screen readers and the keyboard.
 */
export default function AnswerReveal({ open, id, className = '', children }) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'translate-y-0' : '-translate-y-1.5'} ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
