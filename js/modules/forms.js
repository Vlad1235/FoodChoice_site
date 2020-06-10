import {openModalLogic, closeModalLogic} from './modal';
import {makePostRequest} from '../services/services';

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
		openModalLogic('.modal', modalTimerId);
		
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
			
			closeModalLogic('.modal'); 
		}, 4000);
	}
}
export default forms;