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
export default tabs;