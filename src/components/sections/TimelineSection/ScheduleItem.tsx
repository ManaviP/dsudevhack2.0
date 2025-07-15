import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface ScheduleItemProps {
  time: string;
  title: string;
  type: 'talk' | 'break' | 'workshop' | 'ceremony' | string;
  description?: string;
  active?: boolean;
  section?: string;
}

const typeColors: Record<string, string> = {
  talk: 'bg-green-200 text-green-900',
  break: 'bg-yellow-200 text-yellow-900',
  workshop: 'bg-blue-200 text-blue-900',
  ceremony: 'bg-purple-200 text-purple-900',
  default: 'bg-gray-200 text-gray-900',
};

export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  time,
  title,
  type,
  description,
  active = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Generate a unique id for scroll tracking
  const id = `card-${time.replace(/[^\w]/g, '')}-${title.replace(/[^\w]/g, '')}`;

  return (
    <div
      ref={ref}
      id={id}
      className={clsx(
        'relative flex items-center w-full max-w-2xl mx-auto my-6 transition-all duration-700',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-gray-300 before:to-gray-400',
        'pl-8',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{ minHeight: 80 }}
    >
      {/* Timeline dot */}
      <span
        className={clsx(
          'absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4',
          active
            ? 'border-pink-400 bg-pink-500 shadow-[0_0_0_4px_rgba(236,72,153,0.2)]'
            : 'border-gray-300 bg-white',
          'z-10 transition-all duration-500'
        )}
      />
      {/* Pill-shaped card */}
      <div
        className={clsx(
          'flex-1 flex flex-col md:flex-row items-center justify-between rounded-full shadow-lg px-6 py-4',
          typeColors[type] || typeColors.default,
          'transition-all duration-500',
          active ? 'ring-2 ring-pink-400 ring-offset-2' : '',
        )}
      >
        <div className="flex-1 flex flex-col md:flex-row items-center w-full">
          <span className="font-bold text-lg md:text-xl mr-4 md:mr-8 text-left w-28 md:w-32 flex-shrink-0">
            {time}
          </span>
          <span className="font-semibold text-base md:text-lg text-right flex-1">
            {title}
          </span>
        </div>
        {description && (
          <div className="w-full md:w-auto mt-2 md:mt-0 md:ml-6 text-sm text-gray-700 opacity-80 text-left">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem;
