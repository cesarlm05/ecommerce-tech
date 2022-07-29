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
  items = document.getElementById("items"),
  footer = document.getElementById("footer"),
  templateCard = document.getElementById("template-card").content,
  templateFooter = document.getElementById("template-footer").content,
  templateCart = document.getElementById("template-cart").content,
  fragment = document.createDocumentFragment();

let Cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem('Cart')) {
    Cart = JSON.parse(localStorage.getItem('Cart'))
    printCart();
  }
});

cards.addEventListener("click", (e) => {
  addCart(e);
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

const printCards = (data) => {
  //console.log(data);
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = product.price;
    templateCard
      .querySelector("img")
      .setAttribute("src", product.thumbnailUrl);
    templateCard.querySelector(".btn-dark").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCart = (e) => {
  //console.log(e.target);
  //console.log(e.target.classList.contains("btn-dark"));
  if (e.target.classList.contains("btn-dark")) {
    setCart(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCart = (objecto) => {
  //console.log(objecto);
  const producto = {
    id: objecto.querySelector(".btn-dark").dataset.id,
    title: objecto.querySelector("h5").textContent,
    price: objecto.querySelector("p").textContent,
    Count: 1,
  };
  if (Cart.hasOwnProperty(producto.id)) {
    producto.Count = Cart[producto.id].Count + 1;
  } // hasOwnProperty() devuelve un boolean
  Cart[producto.id] = { ...producto };
  //sintaxis extendida o spread syntax permite a un elemento iterable tal como un arreglo o cadena ser expandido, myFunction(...iterableObj);
  printCart();
  //console.log(Cart)
};

const printCart = () => {
  console.log(Cart);
  items.innerHTML = "";
  Object.values(Cart).forEach((producto) => {
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
  localStorage.setItem("Cart", JSON.stringify(Cart)) // Almacena en el LocalStorage
};

const printFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(Cart).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Cart empy!</th>
    `;
    return;
  }
  const nCount = Object.values(Cart).reduce(
    (acc, { Count }) => acc + Count,
    0
  );
  const nprice = Object.values(Cart).reduce(
    (acc, { Count, price }) => acc + Count * price,
    0
  );
  //console.log(nCount);
  templateFooter.querySelectorAll("td")[0].textContent = nCount;
  templateFooter.querySelector("span").textContent = nprice;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnClear = document.getElementById("clear__cart");
  btnClear.addEventListener("click", () => {
    Cart = {};
    printCart();
  });
};

const btnAction = (e) => {
  // acción de aumentar
  if (e.target.classList.contains("btn-info")) {
    // Cart[e.target.dataset.id]
    const producto = Cart[e.target.dataset.id];
    producto.Count = Cart[e.target.dataset.id].Count + 1;
    Cart[e.target.dataset.id] = { ...producto };
    printCart();
  }
  // acción de dismiuir
  if (e.target.classList.contains("btn-danger")) {
    const producto = Cart[e.target.dataset.id];
    producto.Count = Cart[e.target.dataset.id].Count - 1;
    if (producto.Count === 0) {
      delete Cart[e.target.dataset.id];
      // El operador delete de JavaScript remueve una propiedad de un objeto; si no se mantienen más referencias a la misma propiedad, eventualmente se libera automáticamente.
    }
    printCart();
  }
  e.stopPropagation();
  // El método stopPropagation() de la interfaz Event evita la propagación adicional del evento actual en las fases de captura y bubbling.
};
