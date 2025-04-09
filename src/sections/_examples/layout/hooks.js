import { throttle } from 'es-toolkit';
import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useScroll(queryClassName, offsetValue) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const innerHeight = window.innerHeight * offsetValue;
    const scrollPosition = window.scrollY + innerHeight;
    const sections = document.querySelectorAll(`.${queryClassName}`);

    let newIndex = null;

    sections.forEach((section, index) => {
      const top = section.offsetTop;
      const bottom = top + section.clientHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        newIndex = index;
      }
    });

    setActiveIndex(newIndex);
  }, [offsetValue, queryClassName]);

  const throttledHandleScroll = throttle(handleScroll, 1000);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  return activeIndex;
}

// ----------------------------------------------------------------------

export function useHashScroll(offset) {
  const scrollToHash = useCallback(
    (hash) => {
      const element = document.querySelector(hash);
      if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    [offset]
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) scrollToHash(hash);
  }, [scrollToHash]);

  return scrollToHash;
}
