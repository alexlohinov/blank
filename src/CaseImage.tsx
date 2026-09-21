export function CaseImage({ file, alt, caption, cover = false, project = "accord" }: { file: string; alt: string; caption: string; cover?: boolean; project?: string }) {
  const src = `/images/${project}/${file}.webp`;
  return (
    <figure className="case-image">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image in a new tab: ${caption}`}>
        <img src={src} alt={alt} width={file === 'workspace' ? 3456 : 3840} height={2160} loading={cover ? 'eager' : 'lazy'} fetchPriority={cover ? 'high' : 'auto'} />
      </a>
      <figcaption><span>{caption}</span><a href={src} target="_blank" rel="noopener noreferrer">View full size <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></figcaption>
    </figure>
  );
}
