import { useLocation } from 'react-router-dom';
import { getMetadata } from '../../config/metadata';

export function PageMetadata() {
  const location = useLocation();
  const metadata = getMetadata(location.pathname);

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={metadata.other?.canonical} />

      <meta property="og:title" content={metadata.openGraph?.title} />
      <meta property="og:description" content={metadata.openGraph?.description} />
      <meta property="og:type" content={metadata.openGraph?.type} />
      <meta property="og:url" content={metadata.openGraph?.url} />
      <meta property="og:site_name" content={metadata.openGraph?.siteName} />
      {metadata.openGraph?.images?.map((img: { url: string }, i: number) => (
        <meta key={i} property="og:image" content={img.url} />
      ))}
      {metadata.openGraph?.images?.[0] && (
        <>
          <meta property="og:image:width" content={String(metadata.openGraph.images[0].width)} />
          <meta property="og:image:height" content={String(metadata.openGraph.images[0].height)} />
          <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.openGraph?.title} />
      <meta name="twitter:description" content={metadata.openGraph?.description} />
      {metadata.openGraph?.images?.[0] && (
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
      )}
    </>
  );
}