'use strict';

const likeBtn = document.querySelectorAll('.main__products-like');
const likeBtnCatalog = document.querySelectorAll('.catalog__products-like');

likeBtn.forEach(function(item) {
    item.addEventListener('click', () =>
        item.classList.toggle('main__products-like_clicked'));
});

likeBtnCatalog.forEach(function(item) {
    item.addEventListener('click', () =>
        item.classList.toggle('catalog__products-like_clicked'));
});


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev',
    },
});

const swiperTab = new Swiper('.swiper__tab', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper__button--next',
    prevEl: '.swiper__button--prev',
  },
});
  
