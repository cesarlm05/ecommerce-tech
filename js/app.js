// Alumno César L. Medina

// NavBar Toggle.

let menuToggle = document.querySelector(".menuToggle");
let toggleMenu = document.querySelector(".toggleMenu");

menuToggle.addEventListener("click", () => {
  toggleMenu.classList.toggle("active");
});


const countItems = document.getElementById("count__items"),
  totalCart = document.getElementById("total__cart");

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  printItems();
});

const printItems = () => {
  const nCount = Object.values(cart).reduce((acc, { Count }) => acc + Count, 0);
  const nprice = Object.values(cart).reduce(
    (acc, { Count, price }) => acc + Count * price,
    0
  );
//   console.log(nCount);
//   console.log(nprice);
  countItems.innerHTML = nCount;
  totalCart.innerHTML = "$" + nprice;
};
