import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

window.addEventListener('load', () => {
  footerNavListenerResize();
});

window.addEventListener('resize', () => {
  footerNavListenerResize();
});

new Swiper('.swiper', {
  loop: true,
  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  centeredSlides: true,
  slidesPerView: 2.3,
  breakpoints: {
    320: {
      slidesPerView: 1.28,
      spaceBetween: 16,
    },
    560: {
      slidesPerView: 1.5,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 1.7,
      spaceBetween: 36,
    },
    1024: {
      slidesPerView: 1.7,
      spaceBetween: 80,
    },
    1200: {
      slidesPerView: 1.7,
      spaceBetween: 140,
    },
  },
});

function footerNavListenerResize() {
  const footerNav = document.querySelector('.footer_nav_menu');
  if (!footerNav) return;
  if (window.innerWidth < footerNav.scrollWidth) {
    footerNav.classList.add('resized');
  } else {
    footerNav.classList.remove('resized');
  }
}
