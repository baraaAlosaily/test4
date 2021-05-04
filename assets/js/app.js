"use strict";
const mealsContainer = document.getElementsByClassName("my-meal")[0];
const cartItems = document.getElementsByClassName("cart-items")[0];
let totalSection = document.getElementsByClassName("cart-total")[0];

let total = 0;

const startMeals = [
  {
    id: 1,
    filePath:
      "https://d2j8k8fxwhe17j.cloudfront.net/images/slider/%D8%A7%D9%84%D8%AD%D9%85%D8%B5.jpeg",
    name: "Hommos",
    price: "2",
  },

  {
    id: 2,
    filePath:
      "https://pulses.org/images/com_yoorecipe/cropped-Isreal_Falafel-4055.jpg",
    name: "Flafel",
    price: "1",
  },

  {
    id: 3,
    filePath: "https://www.justfood.tv/big/0Pannenkoeken.000.jpg",
    name: "Lazaqeyat",
    price: "2",
  },

  {
    id: 4,
    filePath:
      "https://www.skynewsarabia.com/images/v1/2019/10/19/1291708/800/450/1-1291708.jpg",
    name: "Red Tea",
    price: "2",
  },

  {
    id: 5,
    filePath:
      "https://dinas-kitchen.com/wp-content/uploads/2018/03/IMGP1218-1024x681.jpg",
    name: "Coffee",
    price: "1",
  },
  {
    id: 6,
    filePath:
      "https://kitchen.sayidaty.net/uploads/small/ee/ee32b405fe806e947788addb05e37671_w750_h500.jpg",
    name: "Tomato frying pan",
    price: "1",
  },

  {
    id: 7,
    filePath:
      "https://i2.wp.com/alghad.com/wp-content/uploads/2019/07/2-10.jpg?fit=630%2C395&ssl=1",
    name: "Shrak",
    price: "3",
  },

  {
    id: 8,
    filePath:
      "https://img.youm7.com/ArticleImgs/2019/8/9/90719-%D9%81%D8%AA%D8%A9-%D8%A7%D9%84%D8%AD%D9%85%D8%B5-%D8%A7%D9%84%D8%A3%D8%B1%D8%AF%D9%86%D9%8A%D8%A9--(2).jpg",
    name: "Fatteh",
    price: "5",
  },
];
let allMeals = [];
const Product = function (
  id,
  filePath,
  name,
  price,
  quantity,
  selected,
  total
) {
  this.id = id;
  this.filePath = filePath;
  this.name = name;
  this.price = price;
  this.quantity = quantity || 1;
  this.selected = selected || false;
  this.total = total || 0;
  allMeals.push(this);
};
if (JSON.parse(localStorage.getItem("savedMeals"))) {
  render(JSON.parse(localStorage.getItem("savedMeals")));
  renderCart();
} else {
  render(startMeals);
}

function render(array) {
  for (let index = 0; index < array.length; index++) {
    let selectedMeal = array[index];
    console.log("selectedMeal", selectedMeal);
    const meal = new Product(
      selectedMeal.id,
      selectedMeal.filePath,
      selectedMeal.name,
      selectedMeal.price,
      selectedMeal.quantity,
      selectedMeal.selected,
      selectedMeal.total
    );
    mealsContainer.innerHTML += `
<div class="col-lg-3 col-md-6">
<div class="single-other-issue">
  <div class="thumb">
    <img
      class="img-fluid" id=""
      src=${meal.filePath}
      alt=""
    />
  </div>
  <div class="thumb back">
    <h4 class="shop-Title">${meal.name}</h4>
  </a>
  <p>
  ${meal.name}
  </p>
  <a class="price-botton" id=${meal.id} ><i class="fas fa-shopping-basket"></i> Add To Basket </a>
  <p style="margin-top: 10px;font-weight: bold;" class="shop-item-price">${meal.price}.00 JD</p>
</div>
</div>
</div>
`;
    localStorage.setItem("savedMeals", JSON.stringify(allMeals));
  }

  let addToCartButtons = document.getElementsByClassName("price-botton");
  for (let index = 0; index < addToCartButtons.length; index++) {
    let button = addToCartButtons[index];
    button.addEventListener("click", addTOCardClicked);
  }
}

function renderCart() {
  let deleteButton = document.getElementsByClassName("btn-danger");
  let itemInputs = document.getElementsByClassName("cart-quantity-input");
  cartItems.innerHTML = "";
  for (let index = 0; index < allMeals.length; index++) {
    const selectedMeal = allMeals[index];
    if (selectedMeal.selected === true) {
      cartItems.innerHTML += `
  <div class="cart-item cart-column">
  <img
    class="cart-item-image"
    src="${selectedMeal.filePath}"
    width="100"
    height="100"
  />
  <span class="cart-item-title">${selectedMeal.name}</span>
</div>
<span class="cart-price cart-column">${selectedMeal.price} JD</span>
<div class="cart-quantity cart-column">
  <input id="${selectedMeal.id}" class="cart-quantity-input" type="number" value="${selectedMeal.quantity}" />
  <button id="${selectedMeal.id}" class="btn btn-danger" type="button">Remove</button>
</div>`;
    }
  }

  for (let index = 0; index < deleteButton.length; index++) {
    let button = deleteButton[index];
    button.addEventListener("click", removeItem);
  }

  for (let index = 0; index < itemInputs.length; index++) {
    let button = itemInputs[index];
    button.addEventListener("click", changeQuantity);
  }
  totalSection.innerHTML = ` <strong class="cart-total-title">Total</strong>
  <span class="cart-total-price">${
    localStorage.getItem("total") || total
  } JD</span>`;
}

function addTOCardClicked(e) {
  const mealId = e.target.id;

  for (let index = 0; index < allMeals.length; index++) {
    let selectedMeal = allMeals[index];
    if (selectedMeal.id == mealId) {
      selectedMeal.selected = true;
      selectedMeal.quantity++;
      selectedMeal.total = selectedMeal.price * selectedMeal.quantity;
    }
  }
  localStorage.setItem("savedMeals", JSON.stringify(allMeals));
  renderCart();
}

function removeItem(e) {
  let itemId = e.target.id;
  let selectedMeal;
  for (let index = 0; index < allMeals.length; index++) {
    selectedMeal = allMeals[index];
    if (selectedMeal.id == itemId) {
      selectedMeal.selected = !selectedMeal.selected;
      selectedMeal.quantity = 0;
      selectedMeal.total = 0;
    }
  }
  localStorage.setItem("savedMeals", JSON.stringify(allMeals));
  renderCart();
  renderTotal();
}

function changeQuantity(e) {
  let itemId = e.target.id;
  let quantity = e.target.value;
  let selectedMeal;
  for (let index = 0; index < allMeals.length; index++) {
    if (allMeals[index].id == itemId) {
      selectedMeal = allMeals[index];
      let price = selectedMeal.price;
      selectedMeal.quantity = quantity;
      selectedMeal.total = price * selectedMeal.quantity;
    }
  }
  localStorage.setItem("savedMeals", JSON.stringify(allMeals));

  console.log("total", total);
  renderTotal();
}

function renderTotal() {
  total = 0;
  for (let index = 0; index < allMeals.length; index++) {
    if (allMeals[index].total) {
      console.log("hii");
      total += allMeals[index].total;
    }
  }
  localStorage.setItem("total", total);

  totalSection.innerHTML = ` <strong class="cart-total-title">Total</strong>
  <span class="cart-total-price">${
    localStorage.getItem("total") || total
  } JD</span>`;
}
