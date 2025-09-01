import Swiper from 'swiper';
import { Navigation, EffectCreative } from 'swiper/modules';

window.addEventListener('load', () => {
  ListenerResize();
  RoomTabs();
});

window.addEventListener('resize', () => {
  ListenerResize();
});

new Swiper('.swiper-events', {
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

const wideSwiper = new Swiper('.wide-swiper', {
  loop: true,
  centeredSlides: true,
  modules: [Navigation, EffectCreative],
  speed: 2000,
  slidesPerView: 1,
  allowTouchMove: false,
  spaceBetween: 300,
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: ['-100%', 0, 0],
      scale: 1.1,
    },
    next: {
      translate: ['100%', 0, 0],
      scale: 1.1,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const sliderEl = document.querySelector('.wide-swiper');
if (sliderEl) {
  sliderEl.addEventListener('click', () => {
    wideSwiper.slideNext();
  });
}

function ListenerResize() {
  const items = document.querySelectorAll('.scroll-element');
  if (!items.length) return;

  items.forEach((el) => {
    if (window.innerWidth < el.scrollWidth) {
      el.classList.add('resized');
    } else {
      el.classList.remove('resized');
    }
  });
}

function RoomTabs() {
  const rooms = document.querySelectorAll('.rooms_item');
  const roomTabButtons = document.querySelectorAll('.rooms_filter .filter_button');

  for(let button of roomTabButtons) {
    button.addEventListener('click', () => {

      //change button active state
      for(let tabButton of roomTabButtons){
        tabButton.classList.remove('active');
      }

      button.classList.add('active');

      //show/hide rooms
      const type = button.innerText;
      console.log(button.innerText);
      for(let room of rooms) {
        
        if (room.dataset.type == type || type == 'All') {
          room.style.display = 'flex';
        }
        else {
          room.style.display = 'none';
        }
      }
    });
  }
}