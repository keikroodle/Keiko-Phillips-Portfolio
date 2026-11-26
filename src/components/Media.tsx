import React from 'react';

export const publicUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  const fullPath = base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
  return encodeURI(decodeURI(fullPath));
};

export interface ResponsiveImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  style?: React.CSSProperties;
}

export const ResponsiveImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  style
}: ResponsiveImageProps) => {
  const resolvedSrc = publicUrl(src);
  const resolvedWebp = webpSrc ? publicUrl(webpSrc) : undefined;

  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: resolvedSrc,
    alt,
    loading,
    decoding,
    referrerPolicy: 'no-referrer',
    className,
    style,
    ...(fetchPriority !== 'auto' ? { fetchPriority } : {})
  };

  if (resolvedWebp) {
    return (
      <picture className="contents">
        <source srcSet={resolvedWebp} type="image/webp" />
        <img {...imgProps} />
      </picture>
    );
  }
  return <img {...imgProps} />;
};
