
// DOM Elements
const header = document.getElementById('header');
const langToggle = document.getElementById('lang-toggle');
const enElements = document.querySelectorAll('.lang-en');
const zhElements = document.querySelectorAll('.lang-zh');

// State
let currentLang = 'en';

// Language Toggle Logic
langToggle.addEventListener('click', () => {
  if (currentLang === 'en') {
    // Switch to Chinese
    enElements.forEach(el => el.classList.add('hidden'));
    zhElements.forEach(el => el.classList.remove('hidden'));
    currentLang = 'zh';
  } else {
    // Switch to English
    zhElements.forEach(el => el.classList.add('hidden'));
    enElements.forEach(el => el.classList.remove('hidden'));
    currentLang = 'en';
  }
});

// Utility to hide/show (CSS class helper)
// We need to ensure .hidden class is defined. 
// I'll add it dynamically or ensure it's in CSS.
// It wasn't in my CSS earlier! I need to add it or handle style.display.
// Easier to handle style.display loop here or add a style rule.
// Adding a style rule via JS is quickest fix without touching CSS again.
const style = document.createElement('style');
style.innerHTML = `
  .hidden { display: none !important; }
`;
document.head.appendChild(style);


// Header Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => {
  // Set initial state via JS ensuring CSS doesn't hide it forever if JS fails
  // But CSS already has animation.
  // Actually my CSS has `animation: fadeInUp` which runs on load.
  // To trigger on scroll, I should remove the animation class and add it when viewed.
  // OR just use the observer to add a class 'visible'.
  
  // Let's refine the CSS strategy. 
  // The CSS has `.fade-in-up` with `animation: ...`. This runs immediately.
  // I want it to run on scroll.
  // I will reset the styles to opacity 0 and add the class 'animate' when in view.
  
  el.style.animation = 'none'; // Stop immediate animation
  el.style.opacity = '0';
  observer.observe(el);
});

// Update Observer callback to restore animation
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s forwards';
      // Restore delays if any
      if (entry.target.classList.contains('delay-100')) entry.target.style.animationDelay = '0.1s';
      if (entry.target.classList.contains('delay-200')) entry.target.style.animationDelay = '0.2s';
      if (entry.target.classList.contains('delay-300')) entry.target.style.animationDelay = '0.3s';
      
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => {
  scrollObserver.observe(el);
});
