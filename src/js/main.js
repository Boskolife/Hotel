import Swiper from 'swiper';
import { Navigation, EffectCreative } from 'swiper/modules';

window.addEventListener('load', () => {
  initGalleryModules();
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
  const filterButtons = document.querySelectorAll('.filter_buttons .filter_button');
  const pagination = document.querySelector('.articles_pagination');

  let currentCategory = 'all';
  let currentPage = 1;
  const itemsPerPage = 6;

  function getFilteredItems() {
    return Array.from(items).filter(item => {
      return currentCategory === 'all' || item.dataset.category === currentCategory;
    });
  }

  function renderItems() {
    const filtered = getFilteredItems();

    items.forEach(item => (item.style.display = 'none'));

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filtered.slice(start, end).forEach(item => {
      item.style.display = 'flex';
    });

    // Scroll to top of items
    const el = document.querySelector('.filter_buttons');
    const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({
        top: y,
        behavior: 'smooth'
    });

    renderPagination(filtered.length);
  }

  function renderPagination(totalItems) {
    pagination.innerHTML = ''; 

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return;

    // prev button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination_button';
    prevBtn.innerHTML = `<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.75781 9.25349L0.757812 5.25676L1.32924 4.68579L5.32924 8.68253L4.75781 9.25349Z" fill="#3C3C3C" />
                            <path d="M5.32924 1.83146L1.32924 5.8282L0.757812 5.25724L4.75781 1.2605L5.32924 1.83146Z" fill="#3C3C3C" />
                        </svg>`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderItems();
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        (currentPage === 1 && i <= 3) 
      ) {
        const btn = document.createElement('button');
        btn.className = 'pagination_button';
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => {
          currentPage = i;
          renderItems();
        });
        pagination.appendChild(btn);
      } else if (
        i === 2 && currentPage > 3 ||
        i === totalPages - 1 && currentPage < totalPages - 2
      ) {
        // dots
        const dots = document.createElement('button');
        dots.className = 'pagination_button dots';
        dots.textContent = '...';
        dots.disabled = true;
        pagination.appendChild(dots);
      }
    }

    // next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination_button';
    nextBtn.innerHTML = '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <path d="M1.24219 9.25349L5.24219 5.25676L4.67076 4.68579L0.670761 8.68253L1.24219 9.25349Z" fill="#3C3C3C" />\
                            <path d="M0.670761 1.83146L4.67076 5.8282L5.24219 5.25724L1.24219 1.2605L0.670761 1.83146Z" fill="#3C3C3C" />\
                        </svg>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderItems();
      }
    });
    pagination.appendChild(nextBtn);
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(tabButton => tabButton.classList.remove('active'));
      button.classList.add('active');

      currentCategory = button.dataset.category;
      currentPage = 1;
      
      renderItems();
    
    });
  });

  renderItems(); 
}

initFilter();

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

function initGalleryModules() {
  if(!document.querySelector('.gallery-swiper')) {
    return;
  }

  const swiper = new Swiper('.gallery-swiper', {
    loop: true,
    modules: [Navigation],
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev',
    },
  });

  const modal = document.querySelector('.page-template-gallery-template .base-dialog');
  const items = document.querySelectorAll('.gallery_container .gallery-item');
  if (!items || !modal) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const slideIndex = parseInt(item.dataset.index);
      
      if (!isNaN(slideIndex)) {
        // Add a one-time event listener for transitionEnd
        const onTransitionEnd = () => {
          // Show the modal once slide transition finishes
          modal.classList.add('show');
    
          // Remove this event listener after it fires once
          swiper.off('transitionEnd', onTransitionEnd);
        };
    
        swiper.on('transitionEnd', onTransitionEnd);
        swiper.slideTo(slideIndex);
      } else {
        // fallback if no index found
        modal.classList.add('show');
      }
    });
  });

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }
}
