"user strict";

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

import {openModalLogic} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => openModalLogic(".modal", modalTimerId), 5000);
	
    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]",".modal", modalTimerId);
    timer("2020-06-30");
    cards();
    forms(modalTimerId);
    calc();
    slider({
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