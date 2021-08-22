'use strict';

const like = document.querySelectorAll('.main__products-like');
for (let i of like) {
    i.addEventListener('click', () => {
       i.classList.toggle('like-red');
    })
}