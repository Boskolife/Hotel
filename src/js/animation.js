import Rellax from 'rellax';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

window.addEventListener('load', () => {
    showText();
});

function showText() {
    const heading = document.querySelector('h1');
    const description = heading.nextElementSibling;
    
    heading.classList.add('show');
    description.classList.add('show');    
}


new Rellax('.hero_bg img', {
  speed: 0,             
  center: true,
  round: true,
  vertical: true,
  horizontal: false
});

new Rellax('.rellax-slow img', {
    speed: 0,             
    center: true,
    round: true,
    vertical: true,
    horizontal: false
});

new Rellax('.paralax', {
    speed: 0,             
    center: true,
    round: true,
    vertical: true,
    horizontal: false
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-in").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      delay: .4,
      duration: 1,
      ease: "power2.out",
      once: true,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

gsap.utils.toArray(".fade-in-up").forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    once: true,
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});

gsap.utils.toArray(".animation-text").forEach(section => {
    // переконуємось, що батьківський блок не обрізає елементи
    section.style.overflow = "visible";
  
    const elements = section.children; // всі дочірні елементи
  
    // спочатку ставимо їх невидимими
    gsap.set(elements, { opacity: 0, y: 10 });
  
    // анімація появи з stagger
    gsap.to(elements, {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      delay: .3,
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power5.out",
      stagger: 0.2
    });
});
  
