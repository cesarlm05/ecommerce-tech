/*!
 * Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// NavBar Toggle.

let menuToggle = document.querySelector(".menuToggle");
let toggleMenu = document.querySelector(".toggleMenu");

menuToggle.addEventListener("click", () => {
  toggleMenu.classList.toggle("active");
});

// Alumno César L. Medina

const btnAdd1 = document.getElementById("add__cart-1"),
  btnAdd2 = document.getElementById("add__cart-2"),
  btnAdd3 = document.getElementById("add__cart-3"),
  btnAdd4 = document.getElementById("add__cart-4"),
  btnAdd5 = document.getElementById("add__cart-5"),
  btnAdd6 = document.getElementById("add__cart-6"),
  btnRemCart = document.getElementById("rem__cart"),
  totalCart = document.getElementById("sum__cart"),
  list__cart = document.getElementById("list__cart"),
  countCart = document.getElementById("count__items");

const carts = [];

function phones(id, model, price) {
  this.id = parseInt(id);
  this.model = model;
  this.price = parseFloat(price);
}

function aadCart(id, model, price) {
  if (carts.length < 3) {
    carts.push(new phones(id, model, price));
  } else
  alert("you can only add up to three items")
}

function remCart(id) {
  const index = carts.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) carts.splice(index, 1);
  console.log(carts.length);
}

function remCartItem() {
  carts.splice(0, 1);
  console.log(carts.length);
}

function countItems() {
  let count = carts.length;
  countCart.innerHTML = count;
}

function listCart() {
  list__cart.innerHTML = "";
  for (let product of carts) {
    //console.log("ID :", product.id);
    let itemMod = "Modelo: " + product.model + "</br>";
    let itemPric = "Price: " + product.price;

    const porductLst = document.createElement("p");
    porductLst.innerHTML = itemMod + itemPric;

    // Append to another element:
    list__cart.appendChild(porductLst);
  }
}

function totalCarts() {
  let total = sumPrice();
  totalCart.innerHTML = total;
}

function sumPrice() {
  let sum = 0;
  for (let i = 0; i < carts.length; i++) {
    let element = carts[i].price;
    sum += element;
  }
  return sum;
}

// Eventos

btnAdd1.addEventListener("click", () => {
  let id = 1;
  let model = "Iphone s";
  let price = 80000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnAdd2.addEventListener("click", () => {
  let id = 2;
  let model = "Iphone S 128gb";
  let price = 125000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnAdd3.addEventListener("click", () => {
  let id = 3;
  let model = "Iphone S 265gb";
  let price = 240000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnAdd4.addEventListener("click", () => {
  let id = 4;
  let model = "Motorola ONE";
  let price = 250000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnAdd5.addEventListener("click", () => {
  let id = 5;
  let model = "Motorola Hyper fusion";
  let price = 280000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnAdd6.addEventListener("click", () => {
  let id = 6;
  let model = "Samsung";
  let price = 270000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
  totalCarts();
  listCart();
});

btnRemCart.addEventListener("click", () => {
  remCartItem();
  countItems();
  totalCarts();
  listCart();
});
