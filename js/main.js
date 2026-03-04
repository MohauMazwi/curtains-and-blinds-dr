/* ══════════════════════════════════════════════════════════════
   MAIN.JS — Curtains & Blinds Dr interactions
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initFadeAnimations();
  initAccordions();
  initSwatchSelector();
  initImageGallery();
  initStickyCart();
  initFilterTabs();
  initHeroSlideshow();
});

/* ═══════════ STICKY HEADER ═══════════ */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  // If header is already .scrolled (non-homepage), skip observer
  if (header.classList.contains('scrolled') && !header.classList.contains('header--transparent')) return;

  const hero = document.getElementById('hero');
  if (!hero) {
    // No hero on page, keep header solid
    header.classList.add('scrolled');
    header.classList.remove('header--transparent');
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.remove('scrolled');
        header.classList.add('header--transparent');
      } else {
        header.classList.add('scrolled');
        header.classList.remove('header--transparent');
      }
    },
    { threshold: 0, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height') || 72)}px 0px 0px 0px` }
  );

  observer.observe(hero);
}

/* ═══════════ MOBILE MENU ═══════════ */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    // Update aria
    toggle.setAttribute('aria-expanded', isActive);
  });

  // Close on menu link click
  menu.querySelectorAll('a, button:not(.menu-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ═══════════ FADE-IN ANIMATIONS ═══════════ */
function initFadeAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animations slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ═══════════ ACCORDION ═══════════ */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion__trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isActive = item.classList.contains('active');

      // Close all others in same accordion group
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion__item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const openContent = openItem.querySelector('.accordion__content');
          openContent.style.maxHeight = '0';
          openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ═══════════ FABRIC SWATCH SELECTOR ═══════════ */
function initSwatchSelector() {
  const swatches = document.querySelectorAll('.swatch');
  const label = document.getElementById('swatch-label');
  if (!swatches.length) return;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      // Remove active from all
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Update label
      if (label) {
        label.textContent = swatch.getAttribute('data-name');
      }
    });
  });
}

/* ═══════════ IMAGE GALLERY ═══════════ */
function initImageGallery() {
  const mainImage = document.getElementById('main-image');
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  if (!mainImage || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const imgSrc = thumb.getAttribute('data-img');

      // Smooth transition
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = imgSrc;
        mainImage.style.opacity = '1';
      }, 200);

      // Update active state
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Add transition to main image
  mainImage.style.transition = 'opacity 0.2s ease';
}

/* ═══════════ STICKY ADD TO CART ═══════════ */
function initStickyCart() {
  const stickyCart = document.getElementById('sticky-cart');
  const addToCart = document.getElementById('add-to-cart');
  if (!stickyCart || !addToCart) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        stickyCart.classList.remove('visible');
      } else {
        stickyCart.classList.add('visible');
      }
    },
    { threshold: 0 }
  );

  observer.observe(addToCart);
}

/* ═══════════ COLLECTION FILTER TABS ═══════════ */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card');
  const countEl = document.querySelector('.product-grid__count strong');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update count
      if (countEl) {
        countEl.textContent = visibleCount;
      }
    });
  });
}

/* ═══════════ HERO SLIDESHOW (TIMELAPSE) ═══════════ */
function initHeroSlideshow() {
  const slidesContainer = document.getElementById('hero-slides');
  const indicatorsContainer = document.getElementById('hero-indicators');
  if (!slidesContainer || !indicatorsContainer) return;

  const slides = slidesContainer.querySelectorAll('.hero__slide');
  const indicators = indicatorsContainer.querySelectorAll('.hero__indicator');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  const SLIDE_DURATION = 5000; // 5 seconds per slide
  let slideTimer;

  function goToSlide(index) {
    // Remove active from current
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Reset the fill animation by re-triggering reflow
    const oldFill = indicators[currentSlide].querySelector('.hero__indicator-fill');
    oldFill.style.animation = 'none';
    oldFill.offsetHeight; // trigger reflow
    oldFill.style.animation = '';

    // Set new slide
    currentSlide = index;
    slides[currentSlide].classList.remove('active');

    // Reset Ken Burns by forcing reflow on the image
    const img = slides[currentSlide].querySelector('img');
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = '';

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Reset the fill animation for new active indicator
    const newFill = indicators[currentSlide].querySelector('.hero__indicator-fill');
    newFill.style.animation = 'none';
    newFill.offsetHeight;
    newFill.style.animation = '';
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startAutoPlay() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, SLIDE_DURATION);
  }

  // Click on indicators to jump to slide
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      if (i === currentSlide) return;
      goToSlide(i);
      startAutoPlay(); // Reset timer on manual click
    });
  });

  // Start autoplay
  startAutoPlay();
}
