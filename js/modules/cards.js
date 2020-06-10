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
export default cards;