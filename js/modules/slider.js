function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field, indicatorsSelector}) {
    let slideIndex = 1;
    let offset = 0;
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        widthWindow = window.getComputedStyle(slidesWrapper).width,
        indicators = document.createElement(indicatorsSelector),
        dots = [];

    // Индекс текущего слайда
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(widthWindow) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(widthWindow);
        }

        movingSlides();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentSlideIndex();
        addColorToDots();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(widthWindow) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(widthWindow);
        }

        movingSlides();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentSlideIndex();
        addColorToDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(widthWindow) * (slideTo - 1);

            movingSlides();
            showCurrentSlideIndex();
            addColorToDots();
        });
    });

    //--------------------------------------------------
    // Стили
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slider.style.position = 'relative';
    slides.forEach(item => {
        item.style.width = widthWindow;
    });

    //--------------------------------------------------
    // Технические Функции
    // Красим точки
    function addColorToDots () {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    //   Отобразить иекущий индекс
    function showCurrentSlideIndex () {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }

    // Двигаем слайдер
    function movingSlides () {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    // Проверяем строки и оставляет в них только цифры
    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;