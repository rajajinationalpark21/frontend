/** True on devices with a mouse or trackpad; phones and tablets keep tap-to-open. */
export const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

let hoverTimer;

/**
 * Mouse handlers that call `open` once the pointer has rested on an item for a
 * moment, so sweeping across a list does not flick every answer open.
 */
export const hoverToOpen = (open, delay = 140) => ({
  onMouseEnter: () => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(open, delay);
  },
  onMouseLeave: () => window.clearTimeout(hoverTimer),
});
