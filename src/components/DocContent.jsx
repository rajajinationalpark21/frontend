import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import RichText from './RichText';

/**
 * Renders a client page document (backend `docBlocks`, produced by
 * backend/tools/extract_client_docs.py) in the site's card style.
 * Each `h2` starts a new card; blocks before the first `h2` form an intro card.
 * `gallery` blocks are left to the page, which shows its photos full width.
 */

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

function ContactButtons({ phones = [], email, message }) {
  return (
    <div className="flex flex-wrap gap-3">
      {phones.map((phone) => (
        <React.Fragment key={phone}>
          <a
            href={telHref(phone)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 text-sm font-bold shadow-sm transition"
          >
            <Phone className="w-4 h-4" /> Call {phone}
          </a>
          <a
            href={waHref(phone, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 text-sm font-bold shadow-sm transition"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>
        </React.Fragment>
      ))}
      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/20 dark:border-emerald-700/50 px-4 py-2.5 text-sm font-bold text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition"
        >
          <Mail className="w-4 h-4" /> {email}
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
        <p className="text-base text-gray-600 dark:text-emerald-100/80 leading-relaxed">
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 rounded-2xl bg-emerald-50/50 dark:bg-[#07150c]/60 border border-emerald-900/10 dark:border-emerald-800/30 p-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span className="text-sm text-gray-700 dark:text-emerald-100/85 leading-relaxed">
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
                to={item.to}
                className="group rounded-3xl overflow-hidden border border-emerald-900/15 dark:border-emerald-800/40 bg-white/70 dark:bg-[#07150c]/70 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={ctx.linkImages[item.to]} alt={item.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
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
              to={item.to}
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
    <section className="relative z-10 pt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <DocContent blocks={blocks} onBooking={onBooking} message={message} />
    </section>
  );
}
