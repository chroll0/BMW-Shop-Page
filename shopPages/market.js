document.body.style.height = window.innerHeight;

const creditCard = document.getElementById("creditCard");
const card = document.querySelector(".credit-card");
const closeCart = document.getElementById("close-cart");
const closeContent = document.getElementById("close-content");
const creditBoxes = document.querySelector(".credit-boxes");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const buyBtn = document.querySelector(".buy-btn");
const loadingGif = document.querySelector(".loading-gif");

creditCard.onclick = () => {
  card.classList.toggle("active");
};
closeCart.onclick = () => {
  card.classList.remove("active");
};
addContent();

function addContent() {
  let addToCartButtons = document.getElementsByClassName("add-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  document
    .getElementsByClassName("buy-btn")[0]
    .addEventListener("click", purchaseClicked);
}
function purchaseClicked() {
  let myCart = document.getElementsByClassName("my-cart")[0];
  while (myCart.hasChildNodes()) {
    myCart.removeChild(myCart.firstChild);
  }
  updateCartTotal();
  card.classList.remove("active");
}
function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function addToCartClicked(e) {
  let button = e.target;
  let shopItem = button.parentElement.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("title")[0].innerText;
  let price = shopItem.getElementsByClassName("now-price")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
  card.classList.add("active");
}
function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let myCart = document.getElementsByClassName("my-cart")[0];
  let cartItemNames = myCart.getElementsByClassName("product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `  
  <div class="cart-item">
  <img src="${imageSrc}" alt="item" />
  <div class="detail-box">
    <div class="product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity" />
  </div>
  <i class="fa fa-trash close-content" aria-hidden="true"></i>
</div>`;
  cartRow.innerHTML = cartRowContents;
  myCart.append(cartRow);
  cartRow
    .getElementsByClassName("close-content")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("my-cart")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  if (total > 0) {
    modalWindow();
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
function modalWindow() {
  const openModal = function () {
    overlay.classList.remove("hidden");
    loadingGif.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("hidden");
      loadingGif.classList.add("hidden");
    }, 3000);
  };
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  buyBtn.addEventListener("click", openModal);
  overlay.addEventListener("click", closeModal);
  btnCloseModal.addEventListener("click", closeModal);
}
