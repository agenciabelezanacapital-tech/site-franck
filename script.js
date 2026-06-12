/* ============================================================
   FRANCK RODRIGUES HAIR STYLIST – SCRIPT.JS
   Funcionalidades: menu hambúrguer, smooth scroll, header scroll,
   lightbox, animações com IntersectionObserver, carrossel de
   depoimentos, contador animado, botão WhatsApp flutuante.
============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. UTILITÁRIOS
  ---------------------------------------------------------- */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  /* ----------------------------------------------------------
     2. MENU HAMBÚRGUER
  ---------------------------------------------------------- */
  const menuToggle = $('#menu-toggle');
  const mainNav = $('#main-nav');
  const navLinks = $$('.nav-links a');

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !menuToggle.classList.contains('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    $('.nav-links').classList.toggle('nav-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => toggleMenu());

    // Fecha o menu ao clicar em qualquer link de navegação
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.classList.contains('is-open')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     3. SMOOTH SCROLL PARA ÂNCORAS
  ---------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     4. HEADER – EFEITO DE SCROLL
  ---------------------------------------------------------- */
  const header = $('#header');
  let lastScroll = 0;

  function onHeaderScroll() {
    const currentScroll = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', currentScroll > 40);
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ----------------------------------------------------------
     5. BOTÃO WHATSAPP FLUTUANTE
  ---------------------------------------------------------- */
  const waFloat = $('#whatsapp-float');

  function onWaScroll() {
    if (waFloat) {
      waFloat.classList.toggle('visible', window.scrollY > 300);
    }
  }

  window.addEventListener('scroll', onWaScroll, { passive: true });
  onWaScroll();

  /* ----------------------------------------------------------
     6. ANIMAÇÕES DE ENTRADA – INTERSECTION OBSERVER
  ---------------------------------------------------------- */
  const animElements = $$('.animate-fade-up');

  if (animElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: mostra todos os elementos sem animação
    animElements.forEach((el) => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     7. CONTADOR ANIMADO
  ---------------------------------------------------------- */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);

    function update() {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start);
      if (start < target) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterEls = $$('.count-animate[data-target]');

  if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            animateCounter(el, target, 1800);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     8. LIGHTBOX DA GALERIA
  ---------------------------------------------------------- */
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightbox-img');
  const lightboxCaption = $('#lightbox-caption');
  const lightboxClose = $('#lightbox-close');
  const lightboxOverlay = $('#lightbox-overlay');

  function openLightbox(src, caption, alt) {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxImg.alt = alt || caption || 'Imagem da galeria';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Botões da galeria
  $$('.gallery-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      const caption = btn.dataset.caption;
      const alt = btn.getAttribute('aria-label');

      // Se a imagem existe (não é placeholder), abre o lightbox
      if (src) {
        const img = new Image();
        img.onload = () => openLightbox(src, caption, alt);
        img.onerror = () => {
          // Imagem não existe ainda — feedback visual sutil
          btn.style.outline = '2px solid rgba(201,168,76,0.5)';
          setTimeout(() => (btn.style.outline = ''), 800);
        };
        img.src = src;
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* ----------------------------------------------------------
     9. CARROSSEL DE DEPOIMENTOS
  ---------------------------------------------------------- */
  const track = $('.testimonials-track');
  const cards = $$('.testimonial-card');
  const dots = $$('.dot');
  const prevBtn = $('#prev-testimonial');
  const nextBtn = $('#next-testimonial');

  let currentIndex = 0;
  let autoSlideTimer = null;
  let isDragging = false;
  let startX = 0;
  let isMobile = false;

  function updateCarousel(index) {
    currentIndex = ((index % cards.length) + cards.length) % cards.length;

    const isSmall = window.innerWidth <= 768;
    isMobile = isSmall;

    if (isSmall) {
      const offset = currentIndex * 100;
      track.style.transform = `translateX(-${offset}%)`;
    } else {
      track.style.transform = 'translateX(0)';
    }

    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      if (window.innerWidth <= 768) updateCarousel(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  if (track && cards.length > 0) {
    if (prevBtn) prevBtn.addEventListener('click', () => { updateCarousel(currentIndex - 1); stopAutoSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { updateCarousel(currentIndex + 1); stopAutoSlide(); startAutoSlide(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { updateCarousel(i); stopAutoSlide(); startAutoSlide(); });
    });

    // Touch swipe
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) updateCarousel(currentIndex + (diff > 0 ? 1 : -1));
      isDragging = false;
      startAutoSlide();
    }, { passive: true });

    window.addEventListener('resize', () => updateCarousel(currentIndex), { passive: true });

    updateCarousel(0);
    startAutoSlide();
  }

  /* ----------------------------------------------------------
     10. KEYBOARD NAVIGATION – GALERIA
  ---------------------------------------------------------- */
  $$('.gallery-btn').forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  /* ----------------------------------------------------------
     11. HERO – BADGE DO CONTADOR DE AVALIAÇÕES
  ---------------------------------------------------------- */
  const reviewCountEl = $('#review-count');

  if (reviewCountEl && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(reviewCountEl, 306, 2000);
            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    heroObserver.observe(reviewCountEl);
  }

})();
