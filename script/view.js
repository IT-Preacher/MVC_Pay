(function () {
    function View() {
        this.DOMElements = {
            tabsBody: document.querySelector(".tabs_body"),
            
            tabs: document.querySelectorAll(".tabs_item"),
            tabsBlocks: document.querySelectorAll(".tabs_block"),
            tabsParent: document.querySelector(".tabs_container"),

            btnIncrement: document.getElementById("add"),
            btnDecrement: document.getElementById("remove"),
            quantity: document.getElementById("quantity"),
            quantityControlsDiv: document.querySelector(".quantity-controls"),

            selectCountry: null,
            shippingDetailsConteiner: document.querySelector(".shipping_details_tab"),
            inputCity: document.getElementById("input_city"),
            inputCityAutocomplete: document.querySelector(".autocomplete"),

            btnAddCard: document.getElementById("id_button_add_card"),
            btnShippingDetails: null,
            btnPay: document.getElementById("id_button_pay"),

            btnShipping: null,
            btnCard: document.getElementById("page_card")
        };
        this.counter = 1;
        this.countries = ["Austria","Belgium","Ukraine","Romania",
                          "Poland","France","Estonia","Moldova",
                          "Serbia","Afghanistan","Albania","Algeria",
                          "Andorra","Angola","Zimbabwe"];
        this.product = {
            items: 5,
            price: 240
        }
    }

    View.prototype = {
        renderShippingDetails: function(){
            this.DOMElements.shippingDetailsConteiner.innerHTML += `
                <div class="shipping_details">
                    <div class="shipping_details_left">
                        <img id="img_delivery" src="./img/delivery.jpg" alt="card img">
                        <div class="previous_step" id="page_shipping">← Previous step</div>
                    </div>
                    <div class="shipping_details_right">
                        <h1 id="title_shipping_details">shipping details</h1>
                        <form class="form_shipping_details" id="shipping_details_form">
                            
                            <select type="text" placeholder="Country" id="country" autocomplete="on" name="country-name" form="shipping_details_form">
                                <option>Country</option>
                            </select>
                            <div id="div_for_inputs" class="div_inputs">
                                <input class="shipping_inputs" placeholder="Region" id="input_region" pattern="^.{3,20}$" disabled="disabled" autocomplete="off" required></input>
                                <div class="input_city"></div>
                                <input class="shipping_inputs" placeholder="City" id="input_city" pattern="^.{3,20}$" disabled="disabled" autocomplete="off" required type="text"></input>
                                <form autocomplete="off" action="/action_page.php">
                                    <div class="autocomplete" style="display: none;">
                                        <input id="myInput" type="text" name="myCountry" pattern="^.{3,20}$" placeholder="City"></input>
                                    </div>
                                </form>
                                <input class="shipping_inputs" placeholder="Street" id="input_street" pattern="^.{3,20}$" disabled="disabled" autocomplete="off" required></input>
                                <input class="shipping_inputs" placeholder="Home Address" id="input_home_address" pattern="^.{3,20}$" disabled="disabled" autocomplete="off" required></input>
                            </div>
                            <button class="btn_next" type="submit" id="button_shipping_details" form="shipping_details_form">Continue</button>
                        </form>
                    </div>
                </div>
            `;
            
            let selectTag = document.getElementById("country");
        
            this.DOMElements.btnShippingDetails = document.getElementById("button_shipping_details");
            this.DOMElements.btnShipping = document.getElementById("page_shipping");
            this.DOMElements.selectCountry = selectTag;

            this.initSectionList(selectTag);
        },

        initSectionList: function (selectTag){
            selectTag.innerHTML += this.countries.map(item => `<option value="${item}">${item}</option>`)
        },

        makeAvailableInputs: function (event){
            let shippingInputs = document.querySelectorAll(".shipping_inputs");

            for(let i = 0; i<= shippingInputs.length -1; i++){
                shippingInputs[i].disabled = false;
            }
        },

        productCounter: function (event){
            if(this.counter == 0 || this.counter === this.product.items) {
                this.counter = 1;
                this.DOMElements.quantity.innerHTML = this.counter;
            }
            this.counter = event.target.id == "add" ? this.counter += 1 : this.counter -= 1;
            this.DOMElements.quantity.innerHTML = this.counter;
            this.DOMElements.btnAddCard.innerHTML = `Add to Card $${this.product.price * this.counter}`;
            /*this.DOMElements.btnPay.innerHTML = `Pay $${this.product.price * this.counter}`;*/
        },

    }

    window.app = window.app || {};
    window.app.View = View;

}())