
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
export default modal;
export {openModalLogic, closeModalLogic};