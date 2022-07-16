/*!
 * Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Alumno César L. Medina

const btnAdd1 = document.getElementById("add__cart-1"),
  btnAdd2 = document.getElementById("add__cart-2"),
  btnAdd3 = document.getElementById("add__cart-3"),
  btnAdd4 = document.getElementById("add__cart-4"),
  btnAdd5 = document.getElementById("add__cart-5"),
  btnAdd6 = document.getElementById("add__cart-6"),
  btnRemCart = document.getElementById("rem__cart"),
  countCart = document.getElementById("count__items");

const carts = [];

function phones(id, model, price) {
  this.id = parseInt(id);
  this.model = model;
  this.price = parseFloat(price);
}

let product = new phones();

function aadCart(id, model, price) {
  carts.push(new phones(id, model, price));
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
  for (let product of carts) {
    console.log("ID :", product.id);
    console.log("Modelo :", product.model);
    console.log("Precio :", product.price);
  }
}

function totalPrice(carts) {
  let total;
  if (carts.length > 1) {
    for (let index = 0; index <= carts.length; index++) {
      const element = parseFloat(carts[index].price);
      total = element + element;
    }
    console.log(total);
  }
  console.log(carts[0].price);
}

// Eventos

btnAdd1.addEventListener("click", () => {
  let id = 1;
  let model = "Iphone s";
  let price = 80000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnAdd2.addEventListener("click", () => {
  let id = 2;
  let model = "Iphone S 128gb";
  let price = 125000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnAdd3.addEventListener("click", () => {
  let id = 3;
  let model = "Iphone S 265gb";
  let price = 240000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnAdd4.addEventListener("click", () => {
  let id = 4;
  let model = "Motorola ONE";
  let price = 250000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnAdd5.addEventListener("click", () => {
  let id = 5;
  let model = "Motorola Hyper fusion";
  let price = 280000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnAdd6.addEventListener("click", () => {
  let id = 6;
  let model = "Samsung";
  let price = 270000;
  aadCart(id, model, price);
  //console.log(carts.length);
  countItems();
});

btnRemCart.addEventListener("click", () => {
  remCartItem();
  countItems();
});
