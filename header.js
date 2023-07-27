const navEl = document.querySelector(".nav");
const hamburgerEl = document.querySelector(".hamburger");

hamburgerEl.addEventListener('click', () => {
    
    navEl.classList.toggle('nav--open');
    hamburgerEl.classList.toggle('hamburger--open')
    
})
navEl.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open')
})