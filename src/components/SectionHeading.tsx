import React from "react";

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
}

export default function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl mb-4">
      {children}
    </h2>
  );
} 