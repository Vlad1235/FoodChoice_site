"user strict";

document.addEventListener("DOMContentLoaded", () => {


    //logic for tabs implementation

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(num = 0) {
        tabsContent[num].classList.add("show", "fade");
        tabsContent[num].classList.remove("hide");
        tabs[num].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        console.log("triggered");

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //logic for timer implementation

    const deadline = "2020-07-01";

    function getTimeRemaining(endtime) {
        const i = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(i / (1000 * 60 * 60 * 24));
        const hours = Math.floor((i / (1000 * 60 * 60) % 24));
        const min = Math.floor((i / 1000 / 60) % 60);
        const sec = Math.floor((i / 1000) % 60);
        return {
            "total": i,
            "days": days,
            "hours": hours,
            "min": min,
            "sec": sec
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if (num < 0) {
            return `00`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.min);
            seconds.innerHTML = getZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadline);


    //logic to implement listeners on a modal window

    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");


    modalTrigger.forEach(btn => {
        btn.addEventListener("click", openModalLogic);
    });


    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.getAttribute("data-close")==="") {
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modal.classList.contains("show")) {
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });



    // logic to implement popup modal window with timer and while reach the end of the page

    function openModalLogic() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    const modalTimerId = setTimeout(openModalLogic, 5000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalLogic();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);


    // create menu items dynamically. Create a draft of a menu item. 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 70;
            this.changeToRUB();
        }

        changeToRUB(){
            this.price = +this.price * this.transfer;
        }

        render(){
            const element = document.createElement("div");
            if (this.classes.length === 0) {
                this.defaultClass = "menu__item";
                element.classList.add(this.defaultClass);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const makeGetRequest = async (url) => {
        const res = await fetch(url);
            if(!res.ok){
                throw new Error(`Could not fetch ${url}, status ${res.status}`);
            }
        return await res.json();
    };

    axios.get("http://localhost:3000/menu")
        .then(x=> {
                x.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
        });
    
    // const div = new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item'
    // );
    // div.render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     12,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     10,
    //     '.menu .container',
    //     'menu__item'
    // ).render();


    // Forms to send on backend in json format. (server.php file been considered a server). Notification forms also

    const forms = document.querySelectorAll("form");

    const messageStorage = {
        loading: "img/form/spinner.svg",
        success: "Успешно отправлен! Скоро свяжемся",
        failure: "Что-то пошло не так("
    };

    forms.forEach(item => {
        postData(item);
    });

    const makePostRequest = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: data
        });
        return await res.json();
    };

    function postData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.classList.add("spinner__formatting");
            statusMessage.setAttribute("src", messageStorage.loading); 
            form.insertAdjacentElement("afterend",statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const jsonFormatedData = JSON.stringify(object);

            makePostRequest("http://localhost:3000/requests", jsonFormatedData)
            .then(data => {
                    console.log(data); 
                    showThanksModal(messageStorage.success); 
                    statusMessage.remove();                 
            }).catch(() => {
                showThanksModal(messageStorage.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message){
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide"); 
        openModalLogic();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog"); 
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove(); 
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide"); 
            
            modal.classList.add("hide"); 
            modal.classList.remove("show"); 
            document.body.style.overflow = ""; 
        }, 4000);
    }

    // Slider logic

    const slides = document.querySelectorAll(".offer__slide"),
        previous = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        total = document.querySelector("#total"),
        current = document.querySelector("#current"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length +"%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener("click", ()=>{
        if(offset == +width.slice(0, width.length-2) * (slides.length -1)) { 
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex =1;
        } else {
            slideIndex++;
        }

        if(slideIndex < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex-1].style.opacity = 1;
    });

    previous.addEventListener("click", ()=> {
        if(offset === 0) {              
            offset = +width.slice(0, width.length-2) * (slides.length -1);      
        } else {
            offset -= +width.slice(0, width.length-2); 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slideIndex < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[slideIndex-1].style.opacity = 1;
    });

    function addZero() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }
    addZero();


    // adding dots (rectangular format) at the bottom of window with sliders

    const slider = document.querySelector(".offer__slider");
    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];

    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for(let i =0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i+1);
        dot.classList.add("dot");
        if(i === 0) {
            dot.style.opacity = 1;          
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");
            
            slideIndex = slideTo;
            offset = +width.slice(0, width.length-2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex < 10){
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = "0.5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

});