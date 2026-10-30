import React from 'react';
import { Link } from 'react-router-dom';
import { linkPath } from '../seo/routes';

// One inline mark: **bold**, *italic* or [label](/path).
const MARK = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

/**
 * CMS text as React nodes: "**bold**", "*italic*", "[a link](/booking)" and line
 * breaks. Admins add the marks with Ctrl+B / Ctrl+I in the admin panel.
 */
export default function RichText({ text, strongClassName = 'font-semibold text-gray-900 dark:text-emerald-50' }) {
  if (text === null || text === undefined || text === '') return null;
  return String(text).split('\n').map((line, lineIndex) => (
    <React.Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(MARK).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={index} className={strongClassName}>{part.slice(2, -2)}</strong>;
        }
        if (part.length > 2 && part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          return (
            <Link key={index} to={linkPath(link[2])} className="font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-600">
              {link[1]}
            </Link>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </React.Fragment>
  ));
}
