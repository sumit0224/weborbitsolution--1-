'use client';

import { useEffect } from 'react';

const LoaderCleanup = () => {
  useEffect(() => {
    const run = () => {
      const text = document.getElementById('loader-text');
      const blinds = document.querySelectorAll('.loader-blind');
      const wrapper = document.getElementById('loader-wrapper');

      setTimeout(() => {
        if (!text) return;
        text.style.opacity = '0';
        text.style.transform = 'translate(-50%, -60%)';
      }, 1200);

      setTimeout(() => {
        blinds.forEach((blind) => {
          (blind as HTMLElement).style.transform = 'translateY(-100%)';
        });

        setTimeout(() => {
          if (wrapper) {
            wrapper.remove();
          }
        }, 2000);
      }, 1600);
    };

    if (document.readyState === 'complete') {
      run();
    } else {
      window.addEventListener('load', run, { once: true });
    }

    const hardTimeout = window.setTimeout(() => {
      const wrapper = document.getElementById('loader-wrapper');
      if (wrapper) {
        wrapper.remove();
      }
    }, 8000);

    return () => {
      window.removeEventListener('load', run);
      window.clearTimeout(hardTimeout);
    };
  }, []);

  return null;
};

export default LoaderCleanup;
