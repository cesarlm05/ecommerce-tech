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

// Checkout

const cards = document.getElementById("cards"),
  items = document.getElementById("items"),
  footer = document.getElementById("footer"),
  templateFooter = document.getElementById("template-footer").content,
  templateCart = document.getElementById("template-cart").content,
  countItems = document.getElementById("count__items"),
  totalCart = document.getElementById("total__cart"),
  fragment = document.createDocumentFragment();

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    printCart();
  }
});

items.addEventListener("click", (e) => {
  btnAction(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("../api/api.json");
    const data = await res.json();
    printCards(data);
  } catch (error) {
    console.log(error);
  }
};

const addCart = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCart(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCart = (objecto) => {
  const producto = {
    id: objecto.querySelector(".btn-dark").dataset.id,
    title: objecto.querySelector("h5").textContent,
    price: objecto.querySelector("p").textContent,
    Count: 1,
  };
  if (cart.hasOwnProperty(producto.id)) {
    producto.Count = cart[producto.id].Count + 1;
  } // hasOwnProperty() devuelve un boolean
  cart[producto.id] = { ...producto };
  //sintaxis extendida o spread syntax permite a un elemento iterable tal como un arreglo o cadena ser expandido, myFunction(...iterableObj);
  printCart();
  //console.log(cart)
};

const printCart = () => {
  items.innerHTML = "";
  Object.values(cart).forEach((producto) => {
    templateCart.querySelector("th").textContent = producto.id;
    templateCart.querySelectorAll("td")[0].textContent = producto.title;
    templateCart.querySelectorAll("td")[1].textContent = producto.Count;
    templateCart.querySelector(".btn-info").dataset.id = producto.id;
    templateCart.querySelector(".btn-danger").dataset.id = producto.id;
    templateCart.querySelector("span").textContent =
      producto.Count * producto.price;

    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
  printFooter();
  localStorage.setItem("cart", JSON.stringify(cart)); // Almacena en el LocalStorage
};

const printFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Cart empy!</th>
    `;
    return;
  }
  const nCount = Object.values(cart).reduce((acc, { Count }) => acc + Count, 0);
  const nprice = Object.values(cart).reduce(
    (acc, { Count, price }) => acc + Count * price,
    0
  );
  templateFooter.querySelectorAll("td")[0].textContent = nCount;
  templateFooter.querySelector("span").textContent = nprice;
  countItems.innerHTML = nCount;
  totalCart.innerHTML = "$" + nprice;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnClear = document.getElementById("clear__cart");
  btnClear.addEventListener("click", () => {
    cart = {};
    printCart();
    countItems.innerHTML = "0";
    totalCart.innerHTML = "";
  });
};

const btnAction = (e) => {
  // acción de aumentar
  if (e.target.classList.contains("btn-info")) {
    // cart[e.target.dataset.id]
    const producto = cart[e.target.dataset.id];
    producto.Count = cart[e.target.dataset.id].Count + 1;
    cart[e.target.dataset.id] = { ...producto };
    printCart();
  }
  // acción de dismiuir
  if (e.target.classList.contains("btn-danger")) {
    const producto = cart[e.target.dataset.id];
    producto.Count = cart[e.target.dataset.id].Count - 1;
    if (producto.Count === 0) {
      delete cart[e.target.dataset.id];
      // El operador delete de JavaScript remueve una propiedad de un objeto; si no se mantienen más referencias a la misma propiedad, eventualmente se libera automáticamente.
    }
    printCart();
  }
  e.stopPropagation();
  // El método stopPropagation() de la interfaz Event evita la propagación adicional del evento actual en las fases de captura y bubbling.
};
