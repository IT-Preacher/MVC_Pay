(function () {
    function Controller(model, view) {
        this.model = model,
        this.view = view
    }

    Controller.prototype = {
        bindEvents: function(){
            const viewElements = this.view.DOMElements
            const view = this.view;

            //Tabs menu
            window.addEventListener("DOMContentLoaded", (event) => {
                event.preventDefault();

                function hideTabContent(){
                    view.DOMElements.tabsBlocks.forEach(item => {
                        item.style.display = 'none';
                    });

                    view.DOMElements.tabs.forEach(item => {
                        item.classList.remove("tab_item_active");
                    });
                }

                function showTabcontent(i = 0){
                    view.DOMElements.tabsBlocks[i].style.display = "block";
                    view.DOMElements.tabs[i].classList.add("tab_item_active");
                }

                hideTabContent();
                showTabcontent();

                view.DOMElements.tabsBody.addEventListener("click", (event) => {
                    let targetId = event.target.id;

                    console.log(targetId);

                    switch (targetId){
                        case "id_button_add_card":
                            event.preventDefault();
                            hideTabContent();
                            showTabcontent(1);
                            break;
                        case "button_shipping_details":
                            event.preventDefault();
                            hideTabContent();
                            showTabcontent(2);
                            break;
                        case "id_button_pay":
                            event.preventDefault();
                            hideTabContent();
                            showTabcontent(3);
                            break;
                        case "page_shipping":
                            event.preventDefault();
                            hideTabContent();
                            showTabcontent(0);
                            break;
                        case "page_card":
                            event.preventDefault();
                            hideTabContent();
                            showTabcontent(1);
                            break;
                    }
                });

                view.DOMElements.tabsParent.addEventListener("click", (event) => {
                    event.preventDefault();
                    const target = event.target;
                    console.log(target);

                    if(target && target.classList.contains("tabs_item")){
                        view.DOMElements.tabs.forEach((item, i) => {
                            if(target == item){
                                hideTabContent();
                                showTabcontent(i); 
                            }
                        })
                    }
                });
            });

            viewElements.btnIncrement.addEventListener("click", (event) => {
                view.productCounter(event);
            });

            viewElements.btnDecrement.addEventListener("click", (event) => {
                view.productCounter(event);
            });

            view.DOMElements.selectCountry.addEventListener("change", (event) => {
                view.makeAvailableInputs();

                if(e.target.value !== "Ukraine"){
                    document.getElementById("input_city").style.display = "block";
                    document.querySelector(".autocomplete").style.display = "none";
                }else{
                    document.getElementById("input_city").style.display = "none";
                    document.querySelector(".autocomplete").style.display = "block";
                }
            });
        },

        init: function(){
            const view = this.view;
        
            view.renderShippingDetails();
            this.bindEvents();
        }
    }

    window.app = window.app || {};
    window.app.Controller = Controller;

}())


//btnIncrement.addEventListener("click", counterPlus);
//btnDecrement.addEventListener("click", counterMinus);
//selectCountry.addEventListener("change", createInputs);