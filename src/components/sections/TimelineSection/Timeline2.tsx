"use client";
import React, { useEffect, useState } from "react";
import items from "./schedule";
import ScheduleItem from "./ScheduleItem";
import "./timeline.css";

// Helper to group items by section (e.g., Morning, Afternoon, Evening)
const getSection = (index: number) => {
  // Example: you can adjust these splits as needed
  if (index < 3) return "Morning";
  if (index < 6) return "Afternoon";
  return "Evening";
};

const sectionOrder = ["Morning", "Afternoon", "Evening"];

export default function Timeline2() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;
      const activeIndex = items.findIndex((item) => {
        const cardElement = document.getElementById(`card-${item.key}`);
        if (!cardElement) return false;
        const cardTop = cardElement.offsetTop;
        const cardBottom = cardTop + cardElement.offsetHeight;
        return scrollPosition >= cardTop && scrollPosition < cardBottom;
      });
      setActiveCardIndex(activeIndex === -1 ? 0 : activeIndex);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Group items by section
  const sectionedItems: Record<string, typeof items> = { Morning: [], Afternoon: [], Evening: [] };
  items.forEach((item, i) => {
    const section = getSection(i);
    sectionedItems[section].push({ ...item, index: i });
  });

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto px-2">
      {sectionOrder.map((section) => (
        <div key={section} className="mb-12 relative">
          {/* Sticky section heading */}
          <div
            className="sticky top-0 z-20 text-2xl font-bold py-2 px-4 mb-4 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 text-gray-700 shadow backdrop-blur border border-gray-200"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            {section}
          </div>
          <div className="flex flex-col gap-0">
            {sectionedItems[section].map((item, idx) => (
              <ScheduleItem
                key={item.key}
                time={item.time}
                title={item.cardTitle}
                type={item.type}
                description={item.cardDetailedText}
                active={item.index === activeCardIndex}
                section={section}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
