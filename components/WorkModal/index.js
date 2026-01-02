import React from "react";
import Image from 'next/image';

const WorkModal = ({ isOpen, onClose, project }) => {
  const [showDescFade, setShowDescFade] = React.useState(false);
  
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-[94vw] tablet:w-[92vw] max-w-5xl h-[75vh] tablet:h-[72vh] rounded-xl tablet:rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl overflow-hidden">
        <div className="flex flex-col tablet:flex-row h-full">
          {/* Image side */}
          <div className="tablet:bg-[#abcca3] tablet:w-3/5 relative flex items-center justify-center p-4 tablet:p-4 bg-transparent ">
            {project.imageSrc && (
              <>
                {/* Mobile: intrinsic sizing, no forced height to avoid whitespace */}
                <div className="w-full tablet:hidden flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-slate-100/30 dark:from-slate-800/50 dark:to-slate-900/30 rounded-lg">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    width={1200}
                    height={900}
                    sizes="100vw"
                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                    priority
                  />
                </div>

                {/* Tablet and up: fill inside a fixed-height column */}
                <div className="hidden tablet:flex relative w-full h-full min-h-0 items-center justify-center">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="60vw"
                    className="object-contain rounded-lg"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#abcca3]/20 via-transparent to-transparent rounded-lg" />
                </div>
              </>
            )}
          </div>

          {/* Content side */}
          <div className="tablet:w-2/5 relative bg-white/80 dark:bg-slate-900/80 backdrop-blur p-4 tablet:p-7 flex flex-col overflow-hidden">
            {/* Title */}
            <h1 className="text-2xl tablet:text-3xl font-bold tracking-tight">
              {project.title}
            </h1>

            {project.headline && (
              <p className="mt-2 text-base tablet:text-lg text-slate-700 dark:text-slate-300 opacity-90">
                {project.headline}
              </p>
            )}

            <div className="mt-3 h-px w-24 bg-gradient-to-r from-slate-300/60 to-transparent" />

            {/* Scroll cue above text */}
            {showDescFade && (
              <div className="flex items-center gap-1 text-xs mt-2" style={{ color: '#abcca3' }}>
                <span>Scroll</span>
                <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}

            {/* Scrollable description area with visible scrollbar */}
            <ScrollableDescription content={project.description} onFadeChange={setShowDescFade} />

            {project.url && (
              <div className="mt-auto pt-6">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full tablet:w-auto text-center px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                >
                  {project.ctaText || 'Visit project ↗'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollableDescription = ({ content, onFadeChange }) => {
  const containerRef = React.useRef(null);
  const [showCue, setShowCue] = React.useState(false);

  const updateFade = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
    const needsScroll = el.scrollHeight > el.clientHeight;
    setShowCue(needsScroll && !atBottom);
    if (onFadeChange) onFadeChange(needsScroll && !atBottom);
  }, []);

  React.useEffect(() => {
    updateFade();
  }, [content, updateFade]);

  return (
    <div
      ref={containerRef}
      onScroll={updateFade}
      className="relative mt-3 flex-1 overflow-y-auto pr-2 tablet:pr-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent"
    >
      {content && (
        <div className="text-[15px] tablet:text-base leading-7 opacity-90 whitespace-pre-line">
          {content}
        </div>
      )}
      {/* keep component self-contained; parent also uses showCue via onFadeChange */}
    </div>
  );
};

export default WorkModal;


