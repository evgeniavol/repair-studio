var mySwiper = new Swiper(".swiper-container", {
    loop: true,
    pagination: {
        el: ".slider-pagination",
        bulletClass: "slider-bullet",
        bulletActiveClass: "slider-bullet-active",
        spaceBetween: 30,
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    }
});

// Mobile navigation
const menu = document.querySelector('.top-menu')
const burger = document.querySelector('.burger-btn')
burger.onclick = () => {
    menu.classList.toggle('mobile-menu')
    burger.classList.toggle('_close')
}

function removeClasses(className, parent) {
    document.querySelectorAll(`.${className}`).forEach(item => item.classList.remove(`_show-${className}`))
    document.querySelectorAll(`.${parent}`).forEach(item => {
        const dropDown = item.querySelector('.drop-btn')
        if (dropDown !== null) {
            dropDown.classList.remove('_clicked')
        }
    })
}

function showSubmenu(event) {
    const dropDown = event.target
    const submenu = dropDown.nextElementSibling
    const className = submenu.className
    const type = className.split(' ')
    const parent = dropDown.closest('li')

    removeClasses(className, parent.className)

    if (className === `${type[0]} _show-${type[0]}`) {
        submenu.classList.remove(`_show-${type[0]}`)
        dropDown.classList.remove('_clicked')
    } else {
        dropDown.classList.add('_clicked')
        submenu.classList.add(`_show-${className}`)
    }
}

document.querySelectorAll('.drop-btn').forEach(item => {
    item.addEventListener('click', showSubmenu)
})



/* modal popup */
$(document).ready(function ($) {
    $('.button').on('click', function () {
        $('.modal-answer').text($(this).attr('data-popup'));
        $('.modal').css("display", "flex").hide().fadeIn();
        return false;
    });

    $('.modal-close').click(function () {
        $(this).parents('.modal').fadeOut();
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.modal').fadeOut();
        }
    });

    $('.modal').click(function (e) {
        if ($(e.target).closest('.modal-block').length == 0) {
            $(this).fadeOut();
        }
    });
});


const accordion = document.querySelector('.accordion');
const items = accordion.querySelectorAll('.accordion__item');
const openedItem = items[0];

items.forEach((item) => {

    openedItem.classList.add("is-open");
    const title = item.querySelector('.accordion__title');

    title.addEventListener('click', (e) => {
        const opened_item = accordion.querySelector('.is-open');

        toggle_item(item);

        if (opened_item && opened_item !== item) {
            toggle_item(opened_item);
        }
    });
});

const toggle_item = (item) => {
    const body = item.querySelector('.accordion__body');
    const content = item.querySelector('.accordion__content');

    if (item.classList.contains('is-open')) {
        body.removeAttribute('style');
        item.classList.remove('is-open');
    } else {
        body.style.height = body.scrollHeight + 'px';
        item.classList.add('is-open');
    }
}