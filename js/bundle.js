/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    
    // create calculator

    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if(localStorage.getItem("sex")) {               
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";                             
        localStorage.setItem("sex", "female");      
    }

    if(localStorage.getItem("ratio")) {             
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;                              
        localStorage.setItem("ratio", 1.375);       
    }
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute("id")===localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute("data-ratio")===localStorage.getItem("ratio")){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {                                          
        if(!sex || !height || !weight || !age || !ratio) {          
            result.textContent = "____";
            return;
        }
        if( sex === "female") { 
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {    
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {                                  
            elem.addEventListener("click", (e)=> {
                if(e.target.getAttribute("data-ratio")) {           
                    ratio = +e.target.getAttribute("data-ratio");   
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio")); 
                } else {                                             
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));          
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);             
                });
                e.target.classList.add(activeClass);                
                calcTotal();                                        
            });
        });
    }
    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active"); 


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if(input.value.match(/\D/g)) {              
                input.style.border = "1px solid red";   
            } else {
                input.style.border = "none";            
            }
            switch(input.getAttribute("id")) {          
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();                                
        });
    }
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
        
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function cards() {

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
	
	// const makeGetRequest = async (url) => {
	// 	const res = await fetch(url);
	// 	if(!res.ok){
	// 		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	// 	}
	// 	return await res.json();
	// };
	
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
	
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(modalTimerId) {
    
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
			
			Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["makePostRequest"])("http://localhost:3000/requests", jsonFormatedData)
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
		Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModalLogic"])('.modal', modalTimerId);
		
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
			
			Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModalLogic"])('.modal'); 
		}, 4000);
	}
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModalLogic, closeModalLogic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModalLogic", function() { return openModalLogic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalLogic", function() { return closeModalLogic; });

function openModalLogic(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";

	console.log(modalTimerId);
	if(modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModalLogic(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("hide");
	modal.classList.remove("show");
	document.body.style.overflow = "";
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    
    //logic to implement listeners on a modal window
	
	const modalTrigger = document.querySelectorAll(triggerSelector),
	modal = document.querySelector(modalSelector);
	
	
	modalTrigger.forEach(btn => {
		btn.addEventListener("click", () => openModalLogic(modalSelector, modalTimerId));
	});
	
	
	modal.addEventListener("click", (event) => {
		if (event.target === modal || event.target.getAttribute("data-close")==="") {
			closeModalLogic(modalSelector);
		}
	});
	
	document.addEventListener("keydown", (event) => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			closeModalLogic(modalSelector);
		}
	});
	
	// logic to implement popup modal window with timer and while reach the end of the page
	
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModalLogic(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({
	container, slide, nextArrow, prevArrow, totalCount, currentCount, wrapper, field
}) {
    
    // Slider logic
	
	const slides = document.querySelectorAll(slide),
	slider = document.querySelector(container),
	previous = document.querySelector(prevArrow),
	next = document.querySelector(nextArrow),
	total = document.querySelector(totalCount),
	current = document.querySelector(currentCount),
	slidesWrapper = document.querySelector(wrapper),
	slidesField = document.querySelector(field),
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
		if(offset == +width.replace(/\D/g, "") * (slides.length -1)) { 
			offset = 0;
		} else {
			offset += +width.replace(/\D/g, "");
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
			offset = +width.replace(/\D/g, "") * (slides.length -1);      
		} else {
			offset -= +width.replace(/\D/g, ""); 
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
			offset = +width.replace(/\D/g, "") * (slideTo - 1);
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
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    //logic for tabs implementation
	
	const tabs = document.querySelectorAll(tabsSelector),
	tabsContent = document.querySelectorAll(tabsContentSelector),
	tabsParent = document.querySelector(tabsParentSelector);
	
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}
	
	function showTabContent(num = 0) {
		tabsContent[num].classList.add("show", "fade");
		tabsContent[num].classList.remove("hide");
		tabs[num].classList.add(activeClass);
	}
	
	hideTabContent();
	showTabContent();
	
	tabsParent.addEventListener("click", (event) => {
		const target = event.target;
		console.log("triggered");
		
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(deadline) {
    
    //logic for timer implementation
	
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
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
"user strict";











document.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModalLogic"])(".modal", modalTimerId), 5000);
	
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]",".modal", modalTimerId);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])("2020-06-30");
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])(modalTimerId);
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        totalCount: "#total",
        slide: ".offer__slide",
        prevArrow: ".offer__slider-prev",
        currentCount: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
	
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: makePostRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePostRequest", function() { return makePostRequest; });

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



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map