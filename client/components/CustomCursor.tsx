'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if running on server or if mobile device
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Center the cursor initially
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    // Use event delegation for hover effects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element or its ancestor is interactive
      if (target.closest('a, button, .cursor-hover')) {
        gsap.to(cursor, { scale: 0.5, duration: 0.2 });
        gsap.to(follower, { 
          scale: 2, 
          backgroundColor: 'rgba(32, 178, 170, 0.2)', 
          borderColor: 'transparent', 
          duration: 0.2 
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, .cursor-hover')) {
             gsap.to(cursor, { scale: 1, duration: 0.2 });
             gsap.to(follower, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                borderColor: '#20B2AA', 
                duration: 0.2 
             });
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Hide component return on mobile to prevent rendering empty elements
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] transition-transform duration-200"
      />
    </>
  );
};

export default CustomCursor;
