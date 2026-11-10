import Image from 'next/image';
import { ToComplete } from './ToComplete';
export function MediaFrame({ src, alt, kind = 'image', sizes = '(max-width: 768px) 100vw, 1200px', priority = false }: { src: string | null; alt: string; kind?: 'image' | 'video'; sizes?: string; priority?: boolean }) {
  if (!src) return <div className="media-frame media-frame--empty" role="img" aria-label={alt}><span>{alt}</span><ToComplete /></div>;
  return <div className="media-frame">{kind === 'image' ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={src.startsWith('https://')} /> : <video controls preload="none" playsInline aria-label={alt}><source src={src} /></video>}</div>;
}
