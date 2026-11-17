window.addEventListener('load', () => {
  window.setTimeout(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    document.querySelectorAll('.reveal-load [data-word]').forEach((word, index) => {
      word.style.setProperty('--word-index', index);
    });

    document.querySelectorAll('[data-hero-fade]').forEach((item, index) => {
      item.style.setProperty('--hero-delay', `${620 + index * 140}ms`);
    });

    const sections = [...document.querySelectorAll('main section')].filter((section) => section.id !== 'inicio');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    sections.forEach((section) => {
      section.setAttribute('data-scroll-reveal', '');
      observer.observe(section);
    });

    // Keep content accessible even if an observer is interrupted or unsupported.
    window.setTimeout(() => {
      sections.forEach((section) => section.classList.add('is-visible'));
    }, 5000);
  }, 80);
}, { once: true });
