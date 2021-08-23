/*SIGNUP*/
var modal = document.getElementById("SignUPid");
var btn = document.querySelector(".SignUP");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}


//when function ready loads all the buttons in this function will show*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
/*remove items frm cart*/
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

/*prevent qty to be negative (ref QuantityChanged)*/
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

/*add to Cart click event*/  
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
/*Purchase checkout*/
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

/*remove cartItem*/
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

/*check if no is a number/x neg*/
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {/*check if inputvalue is lesser/equal to 0*/
        input.value = 1 /*if yes change value to 1*/
    }
    updateCartTotal()
}

/*add to Cart click Function*/
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement/*get shop item of the button*/
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText/*get tittle*/
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText/*get price of item*/
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src/*get img of item src attribute*/
    addItemToCart(title, price, imageSrc)
    updateCartTotal()/*if item alrdy added -dont add price to total*/
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div') /*create new element thats not added to html but later -add div to cart items*/
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return/*exit out of the function*/
        }
    }

    /*backtick-can use string on multiple different lines*/
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents /*using html tags instead of just tags*/
    cartItems.append(cartRow) /*append add cart item to end of Cart items*/
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)/*add back remove function*/
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged) /*add back total function*/ 
}

/*update (total multiple by qty and sum )*/
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {//loop over all cartrows//
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]//get price
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //get quantity
        var price = parseFloat(priceElement.innerText.replace('RM', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 /*round off to nearest two decimal places*/
    document.getElementsByClassName('cart-total-price')[0].innerText = 'RM ' + total
}