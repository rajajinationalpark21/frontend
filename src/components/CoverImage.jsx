import { Leaf } from 'lucide-react';
import { sizedImage } from '../utils/heroImage';

/**
 * Card header image with a themed forest placeholder when no image is set.
 * Usage: <CoverImage src={item.image} alt={item.name} icon={PawPrint} className="-mx-8 -mt-8 mb-6" />
 */
export default function CoverImage({ src, alt, icon: Icon = Leaf, aspect = 'aspect-[16/10]', rounded = 'rounded-t-3xl', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${rounded} ${className}`}>
      {src ? (
        <>
          <img src={sizedImage(src, 800)} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 flex flex-col items-center justify-center gap-2 pattern-leaf-veins">
          <Icon className="w-8 h-8 text-emerald-200/80" />
          <span className="px-4 text-center text-[10px] font-bold uppercase tracking-widest text-emerald-100/70 line-clamp-2">
            {alt || 'Photo coming soon'}
          </span>
        </div>
      )}
    </div>
  );
}
