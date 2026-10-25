import { Leaf } from 'lucide-react';
import { sizedImage } from '../utils/heroImage';

/**
 * Small list-row thumbnail with an icon placeholder when no image is set.
 * Usage: <ThumbImage src={item.image} alt={item.name} icon={PawPrint} />
 */
export default function ThumbImage({ src, alt, icon: Icon = Leaf, size = 48, className = '' }) {
  const dims = { width: size, height: size };

  if (src) {
    return <img src={sizedImage(src, size * 2)} alt={alt} style={dims} className={`rounded-xl object-cover shrink-0 ${className}`} />;
  }

  return (
    <span
      style={dims}
      title={alt ? `${alt} — no photo yet` : 'No photo yet'}
      className={`rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/40 ${className}`}
    >
      <Icon className="w-5 h-5" />
    </span>
  );
}
