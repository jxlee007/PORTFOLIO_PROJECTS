// select items
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");


// Creating array of product title and colour so when we click on the function the product will be changed 
// intialise the array of products
const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    // color array
    colors:[
      {
        code:"black",
        img: "./img/air.png",
      },
      {
        code:"darkblue",
        img: "./img/air2.png",
      },
    ],
  },

  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors:[
      {
        code:"lightgray",
        img: "./img/jordan.png",
      },
      {
        code:"green",
        img: "./img/jordan2.png",
      },
    ],
  },

  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors:[
      {
        code:"lightgray",
        img: "./img/blazer.png",
      },
      {
        code:"green",
        img: "./img/blazer2.png",
      },
    ],
  },

  {
    id: 4,
    title: "Crater",
    price: 129,
    colors:[
      {
        code:"black",
        img: "./img/crater.png",
      },
      {
        code:"lightgray",
        img: "./img/crater2.png",
      },
    ],
  },

  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors:[
      {
        code:"gray",
        img: "./img/hippie.png",
      },
      {
        code:"black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

// click to change and choose products
// intialise the array of products
let choosenProduct = products[0];

// select the product elements to click to change
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// To use index in lateral templates 
// we should initialise it first in parameter of a function 
// then should use in literal templates on backticks

// function to animate and change the product
menuItems.forEach((item ,index) => {
  item.addEventListener("click", () => {
    // alert(`clix ${index}`);

    // change the current slide
    wrapper.style.transform = `translateX(${index * -100}vw)`;
    // here index does not change as many times you multiple on click

    // change the choosen product
    choosenProduct = products[index];

    // change texts of cuurent product
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    // initialized color array in products
    currentProductImg.src = choosenProduct.colors[0].img;

    // change the color of current product 
    // we should use queryseletorall so loop can work properly to change all the colors
    currentProductColors.forEach((color,index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    }); 
  });
});

currentProductColors.forEach((color,index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
})

currentProductSizes.forEach((size,index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "#fff";
      size.style.color = "#000";
    })
    size.style.backgroundColor = "#000";
    size.style.color = "#fff";
  })
})

const productbtn = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productbtn.addEventListener("click", () => {
  payment.style.display = "flex";
})

close.addEventListener("click", () => {
  payment.style.display = "none";
})