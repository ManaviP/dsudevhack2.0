import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// 6 custom hex colors for timeline titles
const timelineTitleColors = [
  "#93c5fd", // blue
  "#f9a8d4", // pink
  "#86efac", // green
  "#fde047", // yellow
  "#fca5a5", // red
  "#d8b4fe", // purple
];

// Card component for timeline stages
const TimelineCard = ({ title, subtitle, date, color, className = "" }: { title: string, subtitle: string, date: string, color: string, className?: string }) => (
  <StyledWrapper className={className}>
    <div className="brutal-subscribe">
      <div className="brutal-subscribe__container">
        <div className="brutal-subscribe__header">
          <span className="brutal-subscribe__title" style={{ color }}>{title}</span>
          <span className="brutal-subscribe__subtitle">{subtitle}</span>
        </div>
        <form className="brutal-subscribe__form" onSubmit={e => e.preventDefault()}>
          <button type="button" className="brutal-subscribe__button">{date}</button>
        </form>
      </div>
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .brutal-subscribe__container {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 2px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 2px);
    background-size: 20px 20px;
    border: 5px solid #000;
    position: relative;
    overflow: hidden;
    box-shadow: 15px 15px 0 rgba(0, 0, 0, 0.605);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .brutal-subscribe__container:hover {
    transform: translate(-5px, -5px);
    box-shadow: 20px 20px 0 rgba(0, 0, 0, 0.2.5);
  }
  .brutal-subscribe__header {
    background-color: #000;
    color: #fff;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  .brutal-subscribe__header::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      45deg,
      #ff0 0,
      #ff0 10px,
      #000 10px,
      #000 20px
    );
    opacity: 0.1;
    animation: stripe-animation 20s linear infinite;
  }
  @keyframes stripe-animation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .brutal-subscribe__title {
    display: block;
    font-size: 36px;
    font-weight: bold;
    position: relative;
    z-index: 1;
  }
  .brutal-subscribe__subtitle {
    display: block;
    font-size: 14px;
    position: relative;
    z-index: 1;
  }
  .brutal-subscribe__form {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  .brutal-subscribe__button {
    width: 60%;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: 3px solid #000;
    font-family: inherit;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0 auto;
  }

  .brutal-subscribe__button:hover {
    background-color: #ff0;
    color: #000;
  }

  .brutal-subscribe__button:active {
    transform: scale(0.95);
  }
  @media (max-width: 768px) {
    .brutal-subscribe__container {
      max-width: 240px;
      width: 100%;
      padding: 0 0px;
    }
    .brutal-subscribe__header {
      padding: 12px;
    }
    .brutal-subscribe__title {
      font-size: 22px;
    }
    .brutal-subscribe__subtitle {
      font-size: 12px;
    }
    .brutal-subscribe__form {
      padding: 10px;
    }
    .brutal-subscribe__button {
      font-size: 14px;
      padding: 8px;
      width: 80%;
    }
  }
  @media (max-width: 500px) {
    .brutal-subscribe__container {
      max-width: 240px;
      width: 100%;
    }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  .brutal-subscribe__container:hover .brutal-subscribe__title {
    animation: glitch 0.3s infinite;
  }
`;

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Progress bar animation logic
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const desktopItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check if we're on mobile (screen width < 768px)
          const mobileCheck = window.innerWidth < 768;
          setIsMobile(mobileCheck);
          const refs = mobileCheck ? mobileItemRefs : desktopItemRefs;

          if (refs.current.length === 0) return;

          // Get the timeline container position
          const timelineContainer = ref.current;
          if (!timelineContainer) return;

          const containerRect = timelineContainer.getBoundingClientRect();
          const containerTop = containerRect.top;
          const containerHeight = containerRect.height;

          // Calculate scroll progress within the timeline section
          const scrollProgress = Math.max(0, Math.min(1,
            (window.innerHeight - containerTop) / (window.innerHeight + containerHeight)
          ));

          // Map scroll progress to active index
          const newActive = Math.floor(scrollProgress * refs.current.length);
          setActiveIndex(Math.min(newActive, refs.current.length - 1));

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data.length]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">

        <div className="relative z-10">
          <h2 className="text-2xl md:text-5xl font-bold text-white text-center mt-16 mb-2">Timeline</h2>
          {data.map((item, index) => {
            // Extract subtitle and date from item.content
            let subtitle = '';
            let date = '';
            if (React.isValidElement(item.content)) {
              const children = item.content.props.children;
              if (Array.isArray(children) && children.length > 1) {
                subtitle = children[0]?.props?.children || '';
                date = children[1]?.props?.children || '';
              }
            }
            // Alternate left/right for desktop
            const isLeft = index % 2 === 0;
            return (
              <>
                {/* Desktop: alternating layout (unchanged) */}
                <div
                  key={index}
                  ref={el => desktopItemRefs.current[index] = el}
                  className={`relative w-full hidden md:flex flex-row items-center pt-10 md:pt-24 md:gap-0 group timeline-node-hover`}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Left card (even) */}
                  <div className={`w-1/2 ${isLeft ? 'justify-end pr-8 flex' : 'justify-end pr-8 invisible'}`}>
                    {isLeft && (
                      <TimelineCard title={item.title} subtitle={subtitle} date={date} color={timelineTitleColors[index % timelineTitleColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                    )}
                  </div>
                  {/* Center bar and circle always centered */}
                  <div className="flex flex-col items-center z-10 md:w-0 md:min-w-[80px] md:max-w-[80px] md:items-center items-start">
                    <div className="h-10 w-10 md:h-16 md:w-16 rounded-full bg-white dark:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg relative md:mx-auto ml-2 z-20">
                      <img
                        src={`/images/time circles/${index + 1}.png`}
                        alt={`Timeline ${index + 1}`}
                        className="h-full w-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* Right card (odd) */}
                  <div className={`w-1/2 ${!isLeft ? 'justify-start pl-8 flex' : 'justify-start pl-8 invisible'}`}>
                    {!isLeft && (
                      <TimelineCard title={item.title} subtitle={subtitle} date={date} color={timelineTitleColors[index % timelineTitleColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                    )}
                  </div>
                </div>
                {/* Mobile: bar/circle in left column, card in right column, no overlap */}
                <div
                  ref={el => mobileItemRefs.current[index] = el}
                  className="md:hidden w-full flex flex-row items-start pt-10 group timeline-node-hover"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex flex-col items-center w-16 flex-shrink-0 z-10">
                    <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg relative z-20">
                      <img
                        src={`/images/time circles/${index + 1}.png`}
                        alt={`Timeline ${index + 1}`}
                        className="h-full w-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <TimelineCard title={item.title} subtitle={subtitle} date={date} color={timelineTitleColors[index % timelineTitleColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                  </div>
                </div>
              </>
            );
          })}
          {/* Vertical bar: centered on desktop, left on mobile (adjust left for more space) */}
          <div
            style={{ height: height + "px" }}
            className="absolute md:left-1/2 md:-translate-x-1/2 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] z-0"
          >
            <motion.div
              animate={{ height: ((activeIndex + 1) / data.length) * height, opacity: 1 }}
              transition={{
                duration: isMobile ? 1.2 : 0.6,
                ease: 'easeInOut'
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 