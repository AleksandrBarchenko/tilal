/**
 * TITAL COMPANY — main.js
 * Features: menu toggle, scroll reveal, rotating keywords,
 *           header scroll state, smooth anchor scroll.
 */

/* ══════════════════════════════════════════════════════════
   MENU TOGGLE
══════════════════════════════════════════════════════════ */
(function initMenu() {
  const btn = document.getElementById('menuBtn');
  const overlay = document.getElementById('menuOverlay');
  if (!btn || !overlay) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'ЗАКРИТИ';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'МЕНЮ';
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()));

  // Close when clicking any link in the overlay
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();


/* ══════════════════════════════════════════════════════════
   HEADER SCROLL STATE
══════════════════════════════════════════════════════════ */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  function update() {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════════════════════════════ */
(function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   ROTATING KEYWORDS (About section)
══════════════════════════════════════════════════════════ */
(function initRotatingWords() {
  const container = document.getElementById('rotatingWord');
  if (!container) return;

  const words = [
    'Професіоналізм',
    'Пристрасть',
    'Інновації',
    'Креативність',
    'Команда',
    'Досвід',
    'Технології',
    'Наполегливість',
    'Відповідальність'
  ];

  const span = container.querySelector('span');
  if (!span) return;

  let index = 0;

  setInterval(() => {
    // Fade out
    span.classList.add('fade-out');

    setTimeout(() => {
      index = (index + 1) % words.length;
      span.textContent = words[index];
      span.classList.remove('fade-out');
    }, 350);
  }, 2500);
})();


/* ══════════════════════════════════════════════════════════
   ROTATING KEYWORDS — Card 2 (About section)
══════════════════════════════════════════════════════════ */
(function initRotatingWords2() {
  const container = document.getElementById('rotatingWord2');
  if (!container) return;

  const words = [
    'Інновації',
    'Якість',
    'Надійність',
    'Партнерство',
    'Розвиток',
    'Безпека',
    'Ефективність'
  ];

  const span = container.querySelector('span');
  if (!span) return;

  let index = 0;

  setInterval(() => {
    span.classList.add('fade-out');

    setTimeout(() => {
      index = (index + 1) % words.length;
      span.textContent = words[index];
      span.classList.remove('fade-out');
    }, 350);
  }, 2500);
})();


/* ══════════════════════════════════════════════════════════
   ARTICLES — IMAGE SWAP ON HOVER
══════════════════════════════════════════════════════════ */
(function initArticlesHover() {
  var img = document.getElementById('articlesFeaturedImg');
  if (!img) return;

  var defaultSrc = 'images/armored.webp';
  var articles = document.querySelectorAll('.art-item');

  for (var i = 0; i < articles.length; i++) {
    (function(article) {
      var hoverSrc = article.getAttribute('data-img');
      if (!hoverSrc) return;

      article.addEventListener('mouseenter', function() {
        img.src = hoverSrc;
      });

      article.addEventListener('mouseleave', function() {
        img.src = defaultSrc;
      });
    })(articles[i]);
  }
})();


/* ══════════════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  const headerH = () =>
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      10
    ) || 56;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerH();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   PRODUCT CARD — active state on touch devices
══════════════════════════════════════════════════════════ */
(function initCardTouch() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.p-card').forEach(card => {
      card.addEventListener('click', () => {
        const link = card.querySelector('.p-card__link');
        if (link) link.click();
      });
    });
  }
})();
