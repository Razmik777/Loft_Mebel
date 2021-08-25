'use strict';

const likeBtn = document.querySelectorAll('.main__products-like');
const likeBtn2 = document.querySelectorAll('.catalog__products-like');

likeBtn.forEach(function(item) {
    item.addEventListener('click', () =>
        item.classList.toggle('main__products-like_clicked'));
});

likeBtn2.forEach(function(item) {
    item.addEventListener('click', () =>
        item.classList.toggle('catalog__products-like_clicked'));
});


const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.slider__button--next',
      prevEl: '.slider__button--prev',
    },
  });