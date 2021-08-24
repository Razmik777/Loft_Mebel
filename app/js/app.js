'use strict';

const likeBtn = document.querySelectorAll('.main__products-like');

likeBtn.forEach(function(item) {
    item.addEventListener('click', () =>
        item.classList.toggle('main__products-like_clicked'));
});
