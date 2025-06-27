import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TimeCapsuleSection.css';

gsap.registerPlugin(ScrollTrigger);

// Helper function to calculate the total scrollable width
const getScrollAmount = (element: HTMLElement | null) => {
  if (!element) return 0;
  return element.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);
};

const timeCapsuleItems = [
  {
    id: 1,
    title: 'First DSU DevHack',
    description: 'The inaugural hackathon that started it all.',
    imageUrl: '/images/s1.jpg',
  },
  {
    id: 2,
    title: 'Strong Reach',
    description: 'Attracted 2000+ Registrations and 300+ Onground Hackers.',
    imageUrl: '/images/s2.jpg',
  },
  {
    id: 3,
    title: 'Hybrid Format',
    description: '36 Hours of energetic coding.',
    imageUrl: '/images/s3.jpg',
  },
  {
    id: 4,
    title: 'Multiple Domains ⚡',
    description: '6 different domains including IOT & Web3.',
    imageUrl: '/images/s4.jpg',
  },
  {
    id: 5,
    title: 'Industrial Experts as Jury',
    description: 'Judgement rounds by industry experts.',
    imageUrl: '/images/s5.jpg',
  }
];

export const TimeCapsuleSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!horizontalRef.current || !containerRef.current) return;
  
    const scrollContainer = horizontalRef.current;
    const totalWidth = scrollContainer.scrollWidth;
    const cardWidth = scrollContainer.children[0]?.clientWidth || 0;
    const viewportWidth = window.innerWidth;
  
    const startOffset = viewportWidth / 2 - cardWidth / 2;
    const endOffset = totalWidth - viewportWidth + startOffset;
  
    gsap.set(scrollContainer, { x: startOffset }); // Start with first card centered
  
    const tween = gsap.to(scrollContainer, {
      x: -endOffset,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${endOffset + startOffset}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const center = window.innerWidth / 2;
          const cards = scrollContainer.children;
  
          Array.from(cards).forEach((card) => {
            const box = (card as HTMLElement).getBoundingClientRect();
            const cardCenter = box.left + box.width / 2;
            const distance = Math.abs(center - cardCenter);
            const scale = gsap.utils.mapRange(0, center, 1.1, 0.85, distance);
            const opacity = gsap.utils.mapRange(0, center, 1, 0.4, distance);
  
            gsap.to(card, {
              scale,
              opacity,
              duration: 0.3,
              overwrite: true,
            });
          });
        },
      },
    });
    // Add scroll progress animation
gsap.to('.scroll-progress-fill', {
  width: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: () => `+=${endOffset + startOffset}`,
    scrub: true,
  },
});
// ✅ Add mobile-specific animation
if (window.innerWidth <= 768) {
  const cards = horizontalRef.current?.querySelectorAll(".time-capsule-item");

  if (cards && cards.length > 0) {
    cards.forEach((card) => {
      gsap.fromTo(card,
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        });
    });
  }
}

  
    const handleResize = () => {
      tween.scrollTrigger?.refresh();
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      tween.scrollTrigger?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  

  return (
    <section className="time-capsule-section" ref={containerRef}>
  <div className="scroll-progress-bar">
    <div className="scroll-progress-fill" />
  </div>

      <div className="intro-content">
        <h2 className="time-capsule-title">DevHack Time Capsule</h2>
        <p className="time-capsule-description">
          Scroll down to journey through past DSU DevHack moments.
        </p>
      </div>

      <div className="horizontal-scroll" ref={horizontalRef}>
        {timeCapsuleItems.map((item) => (
          <div key={item.id} className="time-capsule-item">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
