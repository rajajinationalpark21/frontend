import React from 'react';

/**
 * A hidden "website" field that people never see or fill in. Bots that fill
 * every field do; the server then accepts the submission but does not store it.
 * Send its value as `website_hp` with the form.
 */
export default function HoneypotField({ value, onChange }) {
  return (
    <div className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="website_hp">Leave this empty</label>
      <input
        id="website_hp"
        type="text"
        name="website_hp"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
