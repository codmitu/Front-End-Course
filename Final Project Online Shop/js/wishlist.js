// Variables
let url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
var userID;
let list = [];
let wishList = []
let TScart = [];
let quantity = document.querySelectorAll(".quantity");
const modal = document.querySelector(".modal");
const menu = document.querySelector(".fa-bars");




// AJAX function
async function ajax(url, method, body) {
      const res = await fetch(url + ".json", {
          method: method,
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'}
      });
      return await res.json();
}


// get list from database then shuffle the items then build the html
async function getList() {
      list = await ajax(url + "Products");
      list = list.filter(item => item !== null);
      if (localStorage.getItem("TScart") === null) {
          TScart = [];
      } else {
          TScart = JSON.parse(localStorage.getItem("TScart"));
      }
      buildWishlist();
}



// Get user IP address to create a new database for user wislist products
$.getJSON('https://jsonip.com/?callback=?', function(data) {
    userID = JSON.stringify(data.ip).replace(/"/g, "");
    userID = userID.replace(/\./g, "");
});




// get wishlist from database to color item hearts
async function getWishlist() {
      wishList = await ajax(url + userID);
      // wishList = wishList.filter(item => item !== null);
      if (wishList === null) {
          wishList = [];
      }
}



function buildWishlist() {
      let str = "";
      for (let idx = 0; idx < wishList.length; idx++) {
            for (let i = 0; i < list.length; i++) {
                  if (wishList[idx] === null) {
                        continue;
                  } else if (wishList[idx].name === list[i].name) {
                        str += `
                        <div class="item" data-item="${idx}">
                        <div style="display: none" class="item-id">${list[i].id}</div>
                        <div style="display: none" class="info">${list[i].specs}${list[i].name}${list[i].description}</div>
                        <div class="item-name">${list[i].name}</div>
                        <div class="image-container">
                              <a href="details.html?index=${list[i].name}">
                                    <img src=${list[i].image[0]} class="img-item front">
                                    <div class="back"><div class="inner">${list[i].name}, ${list[i].description}</div></div>
                              </a>
                        </div>
                        <div class="item-stock-container">
                              <span>In stock:</span>
                              <span class="item-stock">${list[i].stock.toLocaleString('ro')}</span>
                              <i class="fas fa-cart-plus" title="Add to Cart" onclick="addToCart('${i}');removeItem('${idx}');"></i>
                        </div>
                        <div class="price-heart-wrapper">
                              <div class="price-container">
                                    <span>Price:&nbsp;</span>
                                    <span class="price-item">${list[i].price.toLocaleString('ro')}</span>
                                    <span>&nbsp;RON</span>
                              </div>
                              <i class="fas fa-heart" onclick="removeItem('${idx}');" data-h1="${idx}" title="Remove from Wishlist"></i>
                        </div>
                        </div> 
                        `
                  } 
            }
      }
      document.querySelector("main").innerHTML = str;
      cartQuantity();
}



// Transfer item to Cart
function addToCart(idx) {
      let product = list[idx];
      TScart.push({
            "product": product,
            "quantity": "1"
      });
      localStorage.setItem("TScart", JSON.stringify(TScart));
      cartQuantity();
}


// Remove item from Wishlist
async function removeItem(idx) {
      await ajax(url + userID + "/" + idx, "DELETE");
      document.querySelector(`[data-item="${idx}"]`).remove();
      await getWishlist();
}




// Opens menu on clicking hamburger menu
function showMenu() {
      modal.style.display = "block";
      menu.style.display = "none";
}



// // Hide the modal and closes the menu when clicking on modal
modal.addEventListener('click', (event) => {
      if (event.target.classList.contains("modal")) {
            modal.style.display = "none";
            menu.style.display = "block";
      }
});



// Displays the quantity from localStorage on Cart link and hamburger menu
function cartQuantity() {
      if (TScart.length === 0) {
          document.querySelector(".cart-quantity").style.display = "none";
          document.querySelector(".cart-quantity-mobile").style.display = "none";
          document.querySelector(".cart-quantity-mobile-menu").style.display = "none";
      } else {
          document.querySelector(".cart-quantity").style.display = "inline-block";
          document.querySelector(".cart-quantity").innerText = TScart.length;
          document.querySelector(".cart-quantity-mobile").style.display = "inline-block";
          document.querySelector(".cart-quantity-mobile").innerText = TScart.length;
          document.querySelector(".cart-quantity-mobile-menu").innerText = TScart.length;
          document.querySelector(".cart-quantity-mobile-menu").style.display = "inline-block";
      }
  }

