/*!
* Start Bootstrap - Business Casual v7.0.8 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    listHoursArray[new Date().getDay()].classList.add(('today'));
})

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
    templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);
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
  if (cart.hasOwnProperty(producto.id)) {
    producto.Count = cart[producto.id].Count + 1;
  } // hasOwnProperty() devuelve un boolean
  cart[producto.id] = { ...producto };
  //sintaxis extendida o spread syntax permite a un elemento iterable tal como un arreglo o cadena ser expandido, myFunction(...iterableObj);
  printCart();
  //console.log(cart)
};

const printCart = () => {
  //console.log(Cart);
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
  //console.log(nCount);
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
    // Cart[e.target.dataset.id]
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
      countItems.innerHTML = "0";
      totalCart.innerHTML = "";
      // El operador delete de JavaScript remueve una propiedad de un objeto; si no se mantienen más referencias a la misma propiedad, eventualmente se libera automáticamente.
    }
    printCart();
  }
  e.stopPropagation();
  // El método stopPropagation() de la interfaz Event evita la propagación adicional del evento actual en las fases de captura y bubbling.
};