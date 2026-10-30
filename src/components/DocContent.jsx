import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import RichText from './RichText';
import { linkPath } from '../seo/routes';
import { sizedImage } from '../utils/heroImage';

/**
 * Renders a client page document (backend `docBlocks`, produced by
 * backend/tools/extract_client_docs.py) in the site's card style.
 * Each `h2` starts a new card; blocks before the first `h2` form an intro card.
 * `gallery` blocks are left to the page, which shows its photos full width.
 */

/** Document pages use the full screen width, with a small gap at the sides. */
export const DOC_WIDTH = 'mx-auto w-full px-3 sm:px-5 lg:px-8';

const CARD =
  'min-w-0 bg-[#fdfcf8]/90 dark:bg-[#0c1f13]/90 backdrop-blur-md rounded-3xl p-7 sm:p-10 border border-emerald-900/15 dark:border-emerald-800/40 shadow-sm space-y-5';

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
const waHref = (phone, message) =>
  `https://wa.me/${phone.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

function DocTable({ rows }) {
  const [head, ...body] = rows;
  const columns = Math.max(...rows.map((row) => row.length));
  return (
    <div className="overflow-x-auto rounded-2xl border border-emerald-900/10 dark:border-emerald-800/30">
      <table className="w-full text-left text-sm">
        <thead className="bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs uppercase tracking-wider">
          <tr>
            {head.map((cell, index) => (
              <th key={index} colSpan={index === head.length - 1 ? columns - head.length + 1 : 1} className="px-5 py-3 font-semibold align-bottom">
                <RichText text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-900/10 dark:divide-emerald-900/30">
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition align-top">
              {row.map((cell, index) => (
                <td
                  key={index}
                  colSpan={index === row.length - 1 ? columns - row.length + 1 : 1}
                  className={`px-5 py-3.5 leading-relaxed ${index === 0 ? 'font-semibold text-gray-900 dark:text-emerald-100' : 'text-gray-700 dark:text-emerald-100/80'}`}
                >
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ROUND = 'grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

/** One card per number (call or WhatsApp it), and the email, in a tidy grid. */
function ContactButtons({ phones = [], email, message }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {phones.map((phone) => (
        <div
          key={phone}
          className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-900/10 bg-white/70 py-3 pl-4 pr-3 dark:border-emerald-800/30 dark:bg-[#07150c]/60"
        >
          <a href={telHref(phone)} className="min-w-0 group">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-emerald-200/60">Call or WhatsApp</span>
            <span className="block truncate text-base font-semibold tabular-nums text-gray-900 transition group-hover:text-emerald-700 dark:text-emerald-50 dark:group-hover:text-emerald-300">{phone}</span>
          </a>
          <div className="flex shrink-0 gap-2">
            <a href={telHref(phone)} aria-label={`Call ${phone}`} title="Call" className={`${ROUND} bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-emerald-700`}>
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={waHref(phone, message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${phone}`}
              title="WhatsApp"
              className={`${ROUND} bg-[#25D366] hover:bg-[#1fb457] focus-visible:outline-[#25D366]`}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      ))}
      {email && (
        <a
          href={`mailto:${email}`}
          className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-900/10 bg-white/70 py-3 pl-4 pr-3 transition hover:border-emerald-700/30 dark:border-emerald-800/30 dark:bg-[#07150c]/60"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-emerald-200/60">Email</span>
            <span className="block truncate text-sm font-semibold text-gray-900 transition group-hover:text-emerald-700 dark:text-emerald-50 dark:group-hover:text-emerald-300">{email}</span>
          </span>
          <span className={`${ROUND} bg-emerald-900/80`}>
            <Mail className="h-4 w-4" />
          </span>
        </a>
      )}
    </div>
  );
}

function Block({ block, ctx }) {
  switch (block.t) {
    case 'h3':
      return (
        <h3 className="pt-2 text-lg sm:text-xl font-serif font-bold text-gray-900 dark:text-emerald-50">
          <RichText text={block.text} />
        </h3>
      );
    case 'p':
      return (
        <p className="max-w-[100ch] text-base text-gray-600 dark:text-emerald-100/80 leading-relaxed">
          <RichText text={block.text} />
        </p>
      );
    case 'note':
      return (
        <div className="flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 p-4 sm:p-5">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 dark:text-amber-100/80 leading-relaxed">
            <strong className="font-bold text-amber-800 dark:text-amber-300">{block.label}: </strong>
            <RichText text={block.text} />
          </p>
        </div>
      );
    case 'ul':
      return (
        // A light two-column checklist: hairline rows and a solid tick, no box around each item.
        <ul className="grid grid-cols-1 gap-x-10 border-t border-emerald-900/10 dark:border-emerald-800/30 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 border-b border-emerald-900/10 py-3.5 dark:border-emerald-800/30">
              <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500 dark:text-[#07150c]">
                <Check className="h-3 w-3 stroke-[3.5]" />
              </span>
              <span className="text-[15px] leading-relaxed text-gray-800 dark:text-emerald-100/90">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <span className="pt-1 text-sm sm:text-base text-gray-700 dark:text-emerald-100/85 leading-relaxed">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return <DocTable rows={block.rows} />;
    case 'fact':
      return (
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-base text-gray-700 dark:text-emerald-100/80 leading-relaxed">
            <strong className="font-semibold text-gray-900 dark:text-emerald-50">{block.label}: </strong>
            <RichText text={block.text} />
          </p>
        </div>
      );
    case 'chips':
      return (
        <ul className="flex flex-wrap gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="rounded-full bg-emerald-50/70 dark:bg-[#07150c]/60 border border-emerald-900/10 dark:border-emerald-800/30 px-4 py-2 text-sm font-semibold text-gray-800 dark:text-emerald-100/90">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case 'links':
      // A list of three or more sub-pages becomes photo cards when the page passes images.
      if (block.items.length >= 3 && block.items.every((item) => ctx.linkImages[item.to])) {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {block.items.map((item) => (
              <Link
                key={`${item.to}-${item.label}`}
                to={linkPath(item.to)}
                className="group rounded-3xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 bg-white/70 dark:bg-[#07150c]/70 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={sizedImage(ctx.linkImages[item.to], 600)} alt={item.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5 space-y-1.5">
                  <span className="flex items-center justify-between gap-2 font-serif text-lg font-bold text-gray-900 dark:text-emerald-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                    {item.label}
                    <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-1 transition" />
                  </span>
                  {item.desc && <span className="block text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed">{item.desc}</span>}
                </div>
              </Link>
            ))}
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {block.items.map((item) => (
            <Link
              key={`${item.to}-${item.label}`}
              to={linkPath(item.to)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 bg-white/60 dark:bg-[#07150c]/60 p-4 hover:border-emerald-500/50 hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20 transition"
            >
              <span>
                <span className="block text-sm font-bold text-emerald-800 dark:text-emerald-300">{item.label}</span>
                {item.desc && <span className="block mt-1 text-xs text-gray-600 dark:text-emerald-100/70 leading-relaxed">{item.desc}</span>}
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      );
    case 'cta':
      return (
        <div className="flex flex-wrap gap-3">
          {block.items.map((item) =>
            item.kind === 'booking' ? (
              <button
                key={item.label}
                type="button"
                onClick={ctx.onBooking}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-safari-600 hover:from-emerald-600 hover:to-safari-700 text-white px-5 py-3 text-sm font-extrabold shadow-md transition hover:scale-[1.02]"
              >
                {item.label} <ArrowRight className="w-4 h-4" />
              </button>
            ) : item.kind === 'whatsapp' ? (
              <a key={item.label} href={waHref(ctx.phones[0], ctx.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-sm font-extrabold shadow-md transition">
                <MessageSquare className="w-4 h-4" /> {item.label}
              </a>
            ) : (
              <a key={item.label} href={telHref(ctx.phones[0])} className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 text-sm font-extrabold shadow-md transition">
                <Phone className="w-4 h-4" /> {item.label}
              </a>
            )
          )}
        </div>
      );
    case 'contact':
      return <ContactButtons phones={block.phones} email={block.email} message={ctx.message} />;
    default:
      return null;
  }
}

export default function DocContent({ blocks = [], onBooking, phones = [], message = '', linkImages = {}, className = 'space-y-8' }) {
  // The first contact block's numbers back the "[WHATSAPP / CALL US]" buttons.
  const docPhones = blocks.find((block) => block.t === 'contact' && block.phones?.length)?.phones || [];
  const ctx = { onBooking, message, linkImages, phones: docPhones.length ? docPhones : phones };

  const sections = [];
  for (const block of blocks) {
    if (block.t === 'gallery') continue;
    if (block.t === 'h2' || sections.length === 0) {
      sections.push({ heading: block.t === 'h2' ? block.text : null, blocks: [] });
      if (block.t === 'h2') continue;
    }
    sections[sections.length - 1].blocks.push(block);
  }

  return (
    <div className={className}>
      {sections.map((section, index) => (
        <section key={index} id={section.heading ? slugify(section.heading) : undefined} className={`${CARD} scroll-mt-28`}>
          {section.heading && (
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-emerald-50">
              <RichText text={section.heading} />
            </h2>
          )}
          {section.blocks.map((block, blockIndex) => (
            <Block key={blockIndex} block={block} ctx={ctx} />
          ))}
        </section>
      ))}
    </div>
  );
}

/** A wildlife sub-page's document sections, shown under its header. */
export function DocSection({ blocks, onBooking, message = 'Hello! I would like to book a Rajaji Jeep Safari.' }) {
  if (!blocks?.length) return null;
  return (
    <section className={`relative z-10 pt-16 ${DOC_WIDTH}`}>
      <DocContent blocks={blocks} onBooking={onBooking} message={message} />
    </section>
  );
}
