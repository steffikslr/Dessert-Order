
const buttonsAddProduct = document.getElementsByClassName('button-add-product');
const iconMinusRegularAll = document.getElementsByClassName('icon-minus-regular');
const iconPlusRegularAll = document.getElementsByClassName('icon-plus-regular');
const iconMinusFullAll = document.getElementsByClassName('icon-minus-full');
const iconPlusFullAll = document.getElementsByClassName('icon-plus-full');
const allProducts = document.getElementsByClassName('product-container');
const confirmOrder = document.querySelector(".confirm-order-button");
const starNewOrder = document.querySelector(".new-order-button");
const productFlexContainer = document.querySelector(".product-flex-container")
let confirmedModal = document.querySelector(".confirmed-booking-modal");

let productContainer, cartIcon // Product container of the item we want to add to the cart
//We need to initialize these variables everytime we click on the 'Add to cart' button (otherwise we'll add the wrong item by mistake)
let productImgContainer, productImgDesktop, productImgTablet, productImgMobile, productName, productType, productPrice, iconMinus, iconPlus, iconPlusRegular, iconPlusFull, iconMinusRegular, iconMinusFull, buttonContainer, productImage, iconMinusContainer, iconPlusContainer
let amount, priceTotal, priceTotalAll;
let cartItemContainer, cartItemData, cartProductName, cartItemPrice, cartAmount, cartPriceSingle, cartPriceTotal, cartItemDelteIcon;
let cartItemCount = 0;
let confirmedCartItemContainer,confirmedCartItemData,confirmedItemPrice, confirmedProductImage, confirmedProductName, confirmedCartAmount, confirmedPriceSingle, confirmedPriceTotal, confirmedCartTotalAll;
const cart = document.querySelector('.cart-container');
const cartAllItemContainer = cart.querySelector('.cart-all-items');
let cartAllItems = cartAllItemContainer.children;

let cartTotalAll = cart.querySelector(".cart-total-all");
cartTotalAll.innerText = "$0";

let confirmedCartAllItems = document.querySelector(".confirmed-cart-all-items");

fetchData();

async function fetchData() {
    const response = await fetch("data.json");
    if (!response.ok){
        throw new Error("Could not fetch product data")
    }
    const data = await response.json();
    data.forEach( value => {

        //create product container structure
        productContainer = document.createElement("div");
        productImgContainer = document.createElement("div");
        productImgMobile = document.createElement("img");
        productImgTablet = document.createElement("img");
        productImgDesktop = document.createElement("img");
        buttonContainer = document.createElement("div");
        iconMinusContainer = document.createElement("div");
        iconMinusRegular = document.createElement("img");
        iconMinusFull = document.createElement("img");
        button = document.createElement("button");
        iconCart = document.createElement("img");
        iconPlusContainer = document.createElement("div");
        iconPlusRegular = document.createElement("img");
        iconPlusFull = document.createElement("img");
        productType = document.createElement("p");
        productName = document.createElement("p");
        productPrice = document.createElement("p");

        

        productFlexContainer.appendChild(productContainer);
        productContainer.appendChild(productImgContainer);
        productImgContainer.appendChild(productImgMobile);
        productImgContainer.appendChild(productImgTablet);
        productImgContainer.appendChild(productImgDesktop);
        productImgContainer.appendChild(buttonContainer);
        buttonContainer.appendChild(iconMinusContainer);
        buttonContainer.appendChild(button);
        buttonContainer.appendChild(iconPlusContainer);
        button.appendChild(iconCart);
        iconMinusContainer.appendChild(iconMinusRegular);
        iconMinusContainer.appendChild(iconMinusFull);
        iconPlusContainer.appendChild(iconPlusRegular);
        iconPlusContainer.appendChild(iconPlusFull);
        productContainer.appendChild(productType);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);
        

        //add class names to the new elements
        productContainer.classList.add("product-container");
        productImgContainer.classList.add("product-img-container");
        productImgMobile.classList.add("product-img-mobile");
        productImgTablet.classList.add("product-img-tablet");
        productImgDesktop.classList.add("product-img-desktop");
        buttonContainer.classList.add("button-container");
        iconMinusContainer.classList.add("icon-minus-container");
        iconMinusRegular.classList.add("icon-minus-regular");
        iconMinusFull.classList.add("icon-minus-full");
        button.classList.add("button-add-product");
        iconCart.classList.add("cart-icon");
        iconPlusContainer.classList.add("icon-plus-container");
        iconPlusRegular.classList.add("icon-plus-regular");
        iconPlusFull.classList.add("icon-plus-full");
        productType.classList.add("product-type");
        productName.classList.add("product-name");
        productPrice.classList.add("product-price");

        //add text content to new elements
        productImgMobile.src = value.image.mobile;
        productImgTablet.src = value.image.tablet;
        productImgDesktop.src = value.image.desktop;

        iconMinusRegular.src = "icons/icon-minus.png";
        iconMinusFull.src = "icons/icon-minus-full.png";
        iconPlusRegular.src = "icons/icon-plus.png";
        iconPlusFull.src = "icons/icon-plus-full.png";

        productType.innerText = value.category;
        productName.innerText = value.name;
        productPrice.innerText = `$${value.price.toFixed(2)}`;

        button.innerText = "Add to Cart";
        iconCart.src = "icons/icon-cart.png";
        // Add event listener for setting the button to an active state
        button.addEventListener('click', (event) => {event.preventDefault()
            productContainer = event.target.parentElement.parentElement.parentElement
            activeButton(productContainer, event.target)
            });


        // Add event listeners for minus and plus icons
        iconMinusRegular.addEventListener('mouseover', (event) => { event.preventDefault();
                                                                    substractItem(event.target, event.type);
                                                                    });
        iconMinusRegular.addEventListener('click', (event) => { event.preventDefault();
                                                                substractItem(event.target, event.type);    
                                                                });

        iconMinusRegular.addEventListener('touchstart', () => console.log("Test"));
        iconMinusFull.addEventListener('touchstart', () => console.log("Test Full"));
       
        iconMinusFull.addEventListener('mouseout', (event) => { event.preventDefault();
                                                                    substractItem(event.target, event.type);
                                                                 });

        iconMinusFull.addEventListener('click', (event) => { event.preventDefault();
                                                                  substractItem(event.target, event.type);
                                                                 });

        iconPlusRegular.addEventListener('mouseover', (event) => { event.preventDefault();
                                                                    addItem(event.target, event.type);
                                                                     });

        iconPlusRegular.addEventListener('click', (event) => {event.preventDefault();
                                                                  addItem(event.target, event.type);
                                                                     });

        iconPlusFull.addEventListener('mouseout', (event) => {event.preventDefault();
                                                                addItem(event.target, event.type);
                                                               });
                  
        iconPlusFull.addEventListener('click', (event) => {event.preventDefault();
                                                            addItem(event.target, event.type);
                                                            });

        })
    
} 
// Add event listener for setting the button to an active state
/*for(button of buttonsAddProduct){
    button.addEventListener('click', (event) => {event.preventDefault()
                                                productContainer = event.target.parentElement.parentElement.parentElement
                                                activeButton(productContainer, event.target)
                                                })
}*/

// Add event listeners for minus and plus icons

/*for (iconMinusRegular of iconMinusRegularAll) {

    iconMinusRegular.addEventListener('mouseover', (event) => { event.preventDefault();
                                                        substractItem(event.target, event.type);
  });
  iconMinusRegular.addEventListener('click', (event) => { event.preventDefault();
                                                         substractItem(event.target, event.type);
});
}*/

/*for (iconMinusFull of iconMinusFullAll) {

    iconMinusFull.addEventListener('mouseout', (event) => { event.preventDefault();
                                                      substractItem(event.target, event.type);
  });
  iconMinusFull.addEventListener('click', (event) => { event.preventDefault();
                                                    substractItem(event.target, event.type);
  });

}*/

/*for (iconPlusRegular of iconPlusRegularAll) {

  iconPlusRegular.addEventListener('mouseover', (event) => { event.preventDefault();
                                                            addItem(event.target, event.type);
  });
    iconPlusRegular.addEventListener('click', (event) => {event.preventDefault();
                                                          addItem(event.target, event.type);
});
}*/

/*for (iconPlusFull of iconPlusFullAll) {
  
    iconPlusFull.addEventListener('mouseout', (event) => {event.preventDefault();
                                                        addItem(event.target, event.type);
    });
  
    iconPlusFull.addEventListener('click', (event) => {event.preventDefault();
                                                    addItem(event.target, event.type);
    });
  }*/

confirmOrder.addEventListener("click", (event) => { if(!(cartAllItems.length == 0)){
                                                 confirmedModal.showModal();
                                                 submitCartData(event.target.parentElement)}
                                                })
                                                    
    
                                                
starNewOrder.addEventListener("click", () => {  
                                                cartItemCount = 0;
                                                cartLabel.innerText = `Your Cart (${cartItemCount})`;
                                                cartTotalAll.innerText = '$0';
                                              
                                                for (let i = 0; i < cartAllItems.length; i++) {
                                                    const item = cartAllItems[i];
                                                    for (const product of allProducts) {
                                                  
                                                      if (product.querySelector(".product-name").innerText === item.querySelector(".cart-product-name").innerText) {
                                                        setAddButtonDefault(product);
                                                      }
                                                  
                                                    }
                                                    item.remove();
                                                  
                                                    i--; // decrement the index to account for the removed item
                                                  
                                                  }
                                                for (confirmedItem of confirmedCartAllItems.children){
                                                    confirmedItem.remove();
                                                }
                                                confirmedModal.close()
                                                resetCart(cart)})

//set the state to active and change the style of the button
//initialize the amount 
function activeButton(productContainer, button){
    iconMinus = productContainer.querySelector('.icon-minus-container');
    iconPlus = productContainer.querySelector('.icon-plus-container');


    //Initialize variables for this specific item
    productName = productContainer.querySelector('.product-name');
    productType = productContainer.querySelector('.product-type');
    productPrice = productContainer.querySelector('.product-price');
    productImage = productContainer.querySelector('.product-img-container');
    
    

    //Change Button Style and Image Border
    button.classList.add('button-add-product-active');
    iconMinus.classList.add('icon-minus-active');
    iconPlus.classList.add('icon-plus-active');
    productImage.classList.add('product-img-container-active')
   
    
     //initialize number
     amount = 1;
     button.innerText = amount;  

     //deactivate button (we use + and - now)
     button.disabled = true;
    
     //Add item to cart
     addCart(amount, productName, productPrice) ;

    }


//Action on Plus icon
//Hover effect of Plus icon and add to cart on click
function addItem (target, type){

    //Initialize variables for this specific item
    productContainer = target.parentElement.parentElement.parentElement.parentElement;
    iconPlusRegular = productContainer.querySelector('.icon-plus-regular');
    iconPlusFull = productContainer.querySelector('.icon-plus-full');
    productName = productContainer.querySelector('.product-name');
   // productType = productContainer.querySelector('.product-type');
    //productPrice = productContainer.querySelector('.product-price');

    button = productContainer.querySelector('.button-add-product');

    switch(type){
        case 'mouseover':
            //Hover effect on plus icon
            iconPlusFull.style = 'display: block';
            iconPlusRegular.style = 'display: none';
            break;

        case 'mouseout':
             //Hover effect on plus icon
             iconPlusFull.style = 'display: none';
             iconPlusRegular.style = 'display: block';
             break;

        case 'click':
            //Change the amount and adjust cart
            amount = parseInt(button.innerText);
            amount = addNumber(amount);
            button.innerText = amount;
            adjustCart(amount, productName) 
    }
}

//Action on Minus icon
//Hover effect of Minus icon and add to cart on click (substract the amount in the cart )
function substractItem (target, type){

    //Initialize variables for this specific item
    productContainer = target.parentElement.parentElement.parentElement.parentElement;
    iconMinusRegular = productContainer.querySelector('.icon-minus-regular');
    iconMinusFull = productContainer.querySelector('.icon-minus-full');
    productName = productContainer.querySelector('.product-name');
    //productType = productContainer.querySelector('.product-type');
    //productPrice = productContainer.querySelector('.product-price');
    
    
    button = productContainer.querySelector('.button-add-product');

    switch(type){
        case 'mouseover':
            //Hover effect on minus
            iconMinusFull.style = 'display: block';
            iconMinusRegular.style = 'display: none';
            break;

        case 'mouseout':
             //Hover effect on minus
             iconMinusFull.style = 'display: none';
             iconMinusRegular.style = 'display: block';
             break;

        case 'click':
            //Change the amount and adjust cart
            amount = parseInt(button.innerText);
            amount = subtractNumber(amount, productContainer);
            if (!(amount == null)){
                button.innerText = amount;
                adjustCart(amount, productName);
            }
            
    }
}

//Decrease Amount by 1 and check if amount is null to go back to the not active state
function subtractNumber(amount){
    amount -= 1;
    if (amount === 0){

        //Set default style on 'Add to Cart' button
        setAddButtonDefault(productContainer)

        //delete item in cart
        deleteItem(productName)

        return null

        
    }
    else{
        return amount
    }
   
}

//Increase Amount by 1
function addNumber(amount){
    return amount +=1
}


//Add item to the cart
function addCart(amount, productName, productPrice){

   //deactivate 'empty cart' styling
   cart.querySelector('.cart-empty-container').style.display = 'none';

   //activate cart styling
   cart.querySelector('.cart-total-container').style.display = 'flex';
   cart.querySelector('.carbon-neutrality').style.display = 'flex';
   cart.querySelector('.confirm-order-button').style.display = 'block';

   //create cart item structure
   cartItemContainer = document.createElement("div");
   cartItemData = document.createElement("div");
   cartItemPrice = document.createElement("div");
   cartProductName = document.createElement("p");
   cartAmount = document.createElement("p");
   cartPriceSingle = document.createElement("p");
   cartPriceTotal = document.createElement("p");
   cartItemDelteIcon = document.createElement("svg");

   cartAllItemContainer.appendChild(cartItemContainer);
   cartItemContainer.appendChild(cartItemData);
   cartItemContainer.appendChild(cartItemDelteIcon);
   cartItemData.appendChild(cartProductName);
   cartItemData.appendChild(cartItemPrice);
   cartItemPrice.appendChild(cartAmount);
   cartItemPrice.appendChild(cartPriceSingle);
   cartItemPrice.appendChild(cartPriceTotal);

    //add class names to the new elements
   cartItemContainer.classList.add("cart-item-container");
   cartItemData.classList.add("cart-item-data");
   cartItemPrice.classList.add("cart-item-price");
   cartProductName.classList.add("cart-product-name");
   cartAmount.classList.add("cart-amount");
   cartPriceSingle.classList.add("cart-price-single");
   cartPriceTotal.classList.add("cart-price-total");
   cartLabel = cart.querySelector("h1");
   
   //add text content to new elements and change the cart count and total sum
   cartProductName.innerText = productName.innerText;
   cartAmount.innerText = amount + 'x';
   cartPriceSingle.innerText = `@${productPrice.innerText}`;
   priceTotal = (amount * parseFloat(productPrice.innerText.substring(1))).toFixed(2);
   cartPriceTotal.innerText = `$${priceTotal}`;
   
   //Cart Delte Icon
   cartItemDelteIcon.innerHTML = '<svg class= "cart-item-delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>'
   
 
   cartItemDelteIcon.addEventListener('click', (event) => {event.preventDefault();     
                                                            for (product of allProducts){
                                                                if (product.querySelector('.product-name').innerText == productName.innerText){
                                                                    productContainer = product;
                                                                    setAddButtonDefault(productContainer);
                                                                    deleteItem(productName)}};       
                                                })

   //Cart Label
   cartLabel.innerText = `Your Cart (${cartItemCount +=amount})`;

    //Cart Total
   cartTotalAll = cart.querySelector(".cart-total-all");
   priceTotalAll = (parseFloat(cartTotalAll.innerText.substring(1)) + parseFloat(productPrice.innerText.substring(1))).toFixed(2);
   cartTotalAll.innerText = `$${priceTotalAll}`
  
}


//Adjust the amount of the item in the cart
function adjustCart(amount, productName) {
    cartAllItems = cartAllItemContainer.children
   
//Look for the right item
 for (item of cartAllItems){
     cartProductName = item.querySelector('.cart-product-name');
    
    if (item.querySelector('.cart-product-name').innerText == productName.innerText){
    
        cartProductName = item.querySelector('.cart-product-name');
        cartAmount = item.querySelector('.cart-amount');
        cartPriceTotal = item.querySelector('.cart-price-total');
        cartPriceSingle = item.querySelector('.cart-price-single');

        //Set total price of item
        priceTotal = (amount * parseFloat(cartPriceSingle.innerText.substring(2))).toFixed(2);
        cartPriceTotal.innerText = `$${priceTotal}`;
        
        //check if amount was substracted or added and calculate the cart total based on that
        if (parseInt(cartAmount.innerText.substring(0, cartAmount.innerText.indexOf('x'))) < amount){
            priceTotalAll = (parseFloat(cartTotalAll.innerText.substring(1)) + parseFloat(cartPriceSingle.innerText.substring(2))).toFixed(2);
        }
        else{
            priceTotalAll = (parseFloat(cartTotalAll.innerText.substring(1)) - parseFloat(cartPriceSingle.innerText.substring(2))).toFixed(2);
        }
       
        //set new amount and cart total price
        cartAmount.innerText = amount + 'x';
        cartTotalAll.innerText = `$${priceTotalAll}`;

        //set value back to default
        priceTotal = 0;
        priceTotalAll = 0;

    }
 }
}


//Delete item in cart
function deleteItem(productName){
    for (item of cartAllItems){
        cartProductName = item.querySelector('.cart-product-name');
        cartPriceTotal = item.querySelector('.cart-price-total');
        cartTotalAll = cart.querySelector('.cart-total-all');

        if (cartProductName.innerText == productName.innerText){
           //Remove item from cart
          cartLabel.innerText = `Your Cart (${cartItemCount -=1})`;
          cartTotalAll.innerText = `$${(parseFloat(cartTotalAll.innerText.substring(1)) - parseFloat(cartPriceTotal.innerText.substring(1))).toFixed(2)}`;    
          item.remove();
        }
     }
     if (cartAllItems.length == 0){
        resetCart(cart)
    }
}

function setAddButtonDefault(productContainer){

         //Initialize variables for this specific item
         iconMinus = productContainer.querySelector('.icon-minus-container');
         iconPlus = productContainer.querySelector('.icon-plus-container');
         button = productContainer.querySelector('.button-add-product');
         productImage = productContainer.querySelector('.product-img-container');
         
         //Change back to the standard style (not active)
         button.classList.remove('button-add-product-active');
         iconMinus.classList.remove('icon-minus-active');
         iconPlus.classList.remove('icon-plus-active');
         productImage.classList.remove('product-img-container-active');
 
 
         //Set button style back to standard with the cart icon
         button.innerText ="Add to Cart"
         cartIcon = document.createElement('img');
         cartIcon.src = "icons/icon-cart.png"
         button.prepend(cartIcon)
 
         
         //activate button 'Add to Cart'
         button.disabled = false;
}

function resetCart(cart){
   //Change back to 'empty cart' styling
   cart.querySelector('.cart-empty-container').style.display = 'flex';

   //activate cart styling
   cart.querySelector('.cart-total-container').style.display = 'none';
   cart.querySelector('.carbon-neutrality').style.display = 'none';
   cart.querySelector('.confirm-order-button').style.display = 'none';

}

function submitCartData(cart){
  
for(cartItem of cartAllItems){
  
    //create cart confirmed item structure
    confirmedCartItemContainer = document.createElement("div");
    confirmedCartItemData = document.createElement("div");
    confirmedItemPrice = document.createElement("div");
    confirmedProductName = document.createElement("p");
    confirmedCartAmount = document.createElement("p");
    confirmedPriceSingle = document.createElement("p");
    confirmedPriceTotal = document.createElement("p");
    confirmedProductImage = document.createElement("img");

    confirmedCartAllItems.appendChild(confirmedCartItemContainer);
    confirmedCartItemContainer.appendChild(confirmedProductImage);
    confirmedCartItemContainer.appendChild(confirmedCartItemData);
    confirmedCartItemContainer.appendChild(confirmedPriceTotal);
    confirmedCartItemData.appendChild(confirmedProductName);
    confirmedCartItemData.appendChild(confirmedItemPrice);
    confirmedItemPrice.appendChild(confirmedCartAmount);
    confirmedItemPrice.appendChild(confirmedPriceSingle);

    //add class names to the new elements
    confirmedCartItemContainer.classList.add("confirmed-cart-item-container");
    confirmedCartItemData.classList.add("confirmed-cart-item-data");
    confirmedItemPrice.classList.add("confirmed-cart-item-price");
    confirmedProductName.classList.add("confirmed-cart-product-name");
    confirmedCartAmount.classList.add("confirmed-cart-amount");
    confirmedPriceSingle.classList.add("confirmed-cart-price-single");
    confirmedPriceTotal.classList.add("confirmed-cart-price-total");
    confirmedProductImage.classList.add("confirmed-product-image");

    confirmedProductName.innerText = cartItem.querySelector(".cart-product-name").innerText;
    confirmedCartAmount.innerText = cartItem.querySelector(".cart-amount").innerText;
    confirmedPriceSingle.innerText = cartItem.querySelector(".cart-price-single").innerText;
    confirmedPriceTotal.innerText = cartItem.querySelector(".cart-price-total").innerText;
    
    for (product of allProducts){
        if (product.querySelector('.product-name').innerText == confirmedProductName.innerText){
            confirmedProductImage.src = product.querySelector(".product-img-desktop").src;
        }
        }
}

confirmedCartTotalAll = confirmedModal.querySelector(".confirmed-cart-total-all");
confirmedCartTotalAll.innerText = cart.querySelector(".cart-total-all").innerText;

}