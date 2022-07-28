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

const cards = document.getElementById("cards"),
  itemsCart = document.getElementById("list__cart"),
  footerCart = document.getElementById("footer__cart"),
  templateCard = document.getElementById("template-card").content, // Tarjetas
  templateCart = document.getElementById("template-cart").content, // Carrito
  templateFooterCart = document.getElementById("template-footer-cart").content,
  fragment = document.createDocumentFragment();

let carts = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
}); // El evento DOMContentLoaded se activa cuando el documento HTML se ha cargado por completo

cards.addEventListener("click", (e) => {
  addCart(e);
});



const fetchData = async () => {
  try {
    const res = await fetch("../api/api.json");
    const data = await res.json();
    //console.log(data);
    printCards(data);
  } catch (error) {
    console.log(error);
  }
};

const printCards = (data) => {
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = "$" + product.price;
    templateCard.querySelector("img").setAttribute("src", product.card__img);
    templateCard.querySelector(".btn-outline-dark").dataset.id = product.id; // data-id
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCart = (e) => {
  if (e.target.classList.contains("btn-outline-dark")) {
    //console.log(e.target.parentElement);
    setCart(e.target.parentElement);
  }
  e.stopPropagation();
  // El método stopPropagation() de la interfaz Event evita la propagación adicional del evento actual en las fases de captura y bubbling.
};

const setCart = (products) => {
  const article = {
    id: products.querySelector(".btn-outline-dark").dataset.id,
    title: products.querySelector("h5").textContent,
    price: products.querySelector("p").textContent,
    count: 1,
  };
  if (carts.hasOwnProperty(article.id)) {
    article.count = carts[article.id].count + 1;
  } // hasOwnProperty() devuelve un boolean
  carts[article.id] = { ...article }; //sintaxis extendida o spread syntax
  printCarts();
}; //spread syntax permite a un elemento iterable tal como un arreglo o cadena ser expandido, myFunction(...iterableObj);

const printCarts = () => {
    console.log(carts);
    itemsCart.innerHTML = "";
    Object.values(carts).forEach((products) => {
        templateCart.querySelector("th").textContent = products.id;  // Uncaught TypeError: Cannot set properties of null (setting 'textContent')
        templateCart.querySelectorAll("td")[0].textContent = products.title;
        templateCart.querySelectorAll("td")[1].textContent = products.count;
        templateCart.querySelector(".btn-info").dataset.id = products.id;
        templateCart.querySelector(".btn-danger").dataset.id = products.id;
        templateCart.querySelector("span").textContent =
        products.count * products.price;
  
      const clone = templateCart.cloneNode(true);
      fragment.appendChild(clone);
    });
    itemsCart.appendChild(fragment);
  };