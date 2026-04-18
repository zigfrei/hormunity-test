import './styles/global.css';
import Swiper from 'swiper';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const cardsSwiperEl = document.querySelector('.cards-swiper');

if (cardsSwiperEl) {
  const slidesCount = cardsSwiperEl.querySelectorAll('.swiper-slide').length;
  const desktopVisibleSlides = 5;
  const centerSlideIndex =
    slidesCount >= desktopVisibleSlides ? Math.floor(slidesCount / 2) : 0;
  const enableLoop = slidesCount > desktopVisibleSlides * 2;

  const desktopMq = window.matchMedia('(min-width: 960px)');
  let swiperInstance = null;

  function initDesktop() {
    swiperInstance = new Swiper(cardsSwiperEl, {
      modules: [EffectCoverflow, Navigation],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 5,
      loop: enableLoop,
      rewind: !enableLoop,
      allowTouchMove: true,
      speed: 600,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 220,
        modifier: 1,
        scale: 0.8,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.cards-nav-btn--next',
        prevEl: '.cards-nav-btn--prev',
      },
      on: {
        init(swiper) {
          if (enableLoop) {
            swiper.slideToLoop(centerSlideIndex, 0, false);
          } else {
            swiper.slideTo(centerSlideIndex, 0, false);
          }
        },
      },
    });
  }

  function initMobile() {
    swiperInstance = new Swiper(cardsSwiperEl, {
      modules: [Navigation],
      grabCursor: true,
      centeredSlides: false,
      slidesPerView: 1.2,
      spaceBetween: 12,
      loop: false,
      rewind: true,
      allowTouchMove: true,
      speed: 600,
      breakpoints: {
        640: {
          slidesPerView: 2.2,
        },
      },
      navigation: {
        nextEl: '.cards-nav-btn--next',
        prevEl: '.cards-nav-btn--prev',
      },
    });
  }

  function handleResize(e) {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
    if (e.matches) {
      initDesktop();
    } else {
      initMobile();
    }
  }

  desktopMq.addEventListener('change', handleResize);

  if (desktopMq.matches) {
    initDesktop();
  } else {
    initMobile();
  }
}

//  Header styles toggle on scroll
const header = document.querySelector('.header');

if (header) {
  const toggleHeaderBg = () => {
    header.classList.toggle('bg-white', window.scrollY > 0);
  };

  toggleHeaderBg();
  window.addEventListener('scroll', toggleHeaderBg, { passive: true });
}
