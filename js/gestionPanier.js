const QUANTITYINPUTS = document.getElementsByClassName("cart-quantity-input")


ready()
function ready() {
    let removeCartItemButtons = document.getElementsByClassName("text-danger")
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }


    for (let i = 0; i < QUANTITYINPUTS.length; i++) {
        let input = QUANTITYINPUTS[i]
        input.addEventListener('change', quantityChanged)
    }
}

function quantityChanged(event){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('title-article')[0].innerText
    let price = shopItem.getElementsByClassName('price-article')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    let cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-articles')[0]

    let cartItemNames = cartItems.getElementsByClassName('cart-article-title')
    for (let i =0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title){
            let newQuantity = parseInt(QUANTITYINPUTS[i].value) +1
            QUANTITYINPUTS[i].value = newQuantity
            return
        }
    }
    let cartRowContents = `
                            <td>
                                <span class="cart-article-title">${title}</span>
                            </td>
                            <td>
                                <input class="cart-quantity-input" type="number" value=1 max="10000" min="0" style="width: 3rem;">
                            </td>
                            <td>
                                <span class="cart-article-price cart-column">${price.replace('TTC', '')}</span>
                            </td>
                            <td>
                                <span class="cart-total-article-price cart-column"></span>
                            </td>
                            <td>
                                <i class="far fa-trash-alt text-danger"></i>
                           </td>
                            `

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('text-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-articles')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var totalArticle;
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-article-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = quantityElement.value

        totalArticle = Math.round((price*quantity) *100) /100

        document.getElementsByClassName('cart-total-article-price')[i].innerText = totalArticle + '€'

        total = total + totalArticle
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '€'
    document.getElementById('totalCart').innerText = total + '€'
}
