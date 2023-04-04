document.body.style.height = window.innerHeight;

const openMarket = document.querySelector(".openMarket");
const boxThree = document.querySelector(".boxThree");
const openCarMarket = document.querySelector(".openCarMarket");
const openMotorcycleMarket = document.querySelector(".openMotorcycleMarket");
const footerView = document.querySelector(".footerView");
const footerContainer = document.querySelector(".footerContainer");

openMarket.addEventListener("click", function () {
  openCarMarket.classList.toggle("hidden");
  openMotorcycleMarket.classList.toggle("hidden");
  if (openCarMarket.classList.contains("hidden")) {
    openMarket.textContent = "open market";
    boxThree.classList.remove("activeBoxThree");
  } else {
    openMarket.textContent = "close market";
    boxThree.classList.add("activeBoxThree");
  }
});
footerView.addEventListener("click", function () {
  footerContainer.classList.toggle("activeFooter");
});
