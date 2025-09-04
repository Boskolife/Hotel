import Swiper from 'swiper';
import { Navigation, EffectCreative } from 'swiper/modules';

window.addEventListener('load', () => {
  ListenerResize();
  initFilter();
  initHeaderMenu();
  initPromoHover();
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

function initFilter() {
  const items = document.querySelectorAll('.filter_item');
  const filterButtons = document.querySelectorAll(
    '.filter_buttons .filter_button',
  );

  for (let button of filterButtons) {
    button.addEventListener('click', () => {
      //change button active state
      for (let tabButton of filterButtons) {
        tabButton.classList.remove('active');
      }

      button.classList.add('active');

      const category = button.dataset.category;

      for (let item of items) {
        if (item.dataset.category == category || category == 'all') {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }
}

function initHeaderMenu() {
  const menuLinks = document.querySelectorAll('.header_menu .menu a');
  const subMenus = document.querySelectorAll('.sub-menu');
  const header = document.querySelector('#header');
  const headerMenu = document.querySelector('.header_menu-wrap');
  const burger = document.querySelector('.header_burger');
  const closeBtn = document.querySelector('.close_btn');
  const backdrop = document.querySelector('.backdrop');

  if (!menuLinks.length || !subMenus.length || !header || !headerMenu) return;

  menuLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const target = link.dataset.target;

      if (target) {
        subMenus.forEach((sub) => {
          sub.classList.toggle('active', sub.dataset.menu === target);
        });
      } else {
        subMenus.forEach((sub) => sub.classList.remove('active'));
      }
    });
  });

  header.addEventListener('mouseleave', (e) => {
    const toElement = e.relatedTarget;
    if (!toElement || !header.contains(toElement)) {
      subMenus.forEach((sub) => sub.classList.remove('active'));
    }
  });

  if (burger) {
    burger.addEventListener('click', () => {
      headerMenu.classList.add('open');
      backdrop.classList.add('show');
      document.body.classList.add('lock');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      headerMenu.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.classList.remove('lock');
    });
  }

  const backButtons = document.querySelectorAll('.sub-menu .close_btn');
  backButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentSubMenu = btn.closest('.sub-menu');
      if (currentSubMenu) {
        currentSubMenu.classList.remove('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      headerMenu.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.classList.remove('lock');
      subMenus.forEach((sub) => sub.classList.remove('active'));
    });
  }
}



const select = document.querySelector(".form-select");
  if(select){
    const selected = select.querySelector(".select-selected");
  const items = select.querySelector(".select-items");

  if(selected){
    selected.addEventListener("click", () => {
    items.classList.toggle("show");
  });
  }
  
  if(items){
    items.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      selected.dataset.value = option.dataset.value;
      items.classList.remove("show");
    });
  });
  }
  }

  
  

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      items.classList.remove("show");
    }
  });

function initPromoHover() {
  const items = document.querySelectorAll('.promo_item');
  const images = document.querySelectorAll('.promo_image_group .promo_img');

  if (!items.length || !images.length) return;

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      items.forEach((el) => el.classList.remove('active'));
      images.forEach((img) => img.classList.remove('active'));

      item.classList.add('active');
      images[index].classList.add('active');
    });
  });
}

