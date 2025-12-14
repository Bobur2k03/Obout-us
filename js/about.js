// js/about.js
document.addEventListener('DOMContentLoaded', () => {
  initImageFallback();
  initRevealAnimations();
  respectReducedMotion();
});

/* Image fallback */
function initImageFallback() {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0) applyFallback(img);
    img.addEventListener('error', () => applyFallback(img));
  });

  function applyFallback(img) {
    if (!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    img.style.display = 'none';

    const wrapper = document.createElement('div');
    wrapper.className = 'img-fallback';
    wrapper.setAttribute('role', 'img');
    wrapper.setAttribute('aria-label', 'Изображение недоступно');
    Object.assign(wrapper.style, {
      width: img.style.width || img.getAttribute('width') || '100%',
      maxWidth: getComputedStyle(img).maxWidth || '320px',
      height: '220px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg,#0f1114,#1b1d22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: '0.95rem',
      border: '1px solid rgba(255,255,255,0.03)'
    });
    wrapper.textContent = 'Изображение недоступно';
    img.parentNode.appendChild(wrapper);
  }
}

/* Reveal animations */
function initRevealAnimations() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const baseSelectors = ['.hero-text', '.about-content', '.timeline-item', '.project-card', '.approach-card', '.section-title'];
  const nodes = document.querySelectorAll(baseSelectors.join(', '));
  nodes.forEach(node => {
    if (!node.classList.contains('reveal') && !node.classList.contains('reveal-left') && !node.classList.contains('reveal-right')) {
      node.classList.add('reveal');
    }
  });

  document.querySelectorAll('.work-approach .approach-card').forEach((card, i) => {
    card.classList.add('reveal-right');
    card.classList.add('reveal-delay-' + ((i % 3) + 1));
  });
  document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
    card.classList.add('reveal-right');
    card.classList.add('reveal-delay-' + ((i % 3) + 1));
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), 120 * i);
    });
  }
}

/* Respect reduced motion */
function respectReducedMotion() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.transition = 'none';
      el.style.animation = 'none';
    });
  }
}
