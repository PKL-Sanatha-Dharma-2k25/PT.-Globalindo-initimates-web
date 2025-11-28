import { useEffect, useRef } from 'react';

// ========================================
// ANIMATED SECTION - Slide Up Animation
// ========================================
export const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const el = entry.target;

          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = `opacity 700ms ease-out, transform 700ms ease-out`;
          el.style.transitionDelay = `${delay}ms`;

          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 50);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
};