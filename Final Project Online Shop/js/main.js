// Variables
const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
const loading = document.querySelector(".loading");
const filterPhones = document.querySelector("#parent1");
const filterLaptops = document.querySelector("#parent2");
const filterTvs = document.querySelector("#parent3");
let container = document.querySelector("main");
const modal = document.querySelector(".modal");
const menu = document.querySelector(".menu-icon-wrapper");
let list = [];
let posts = 20;
let idx = 0;



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
    list = await ajax(url);
    list = shuffle(list);
    if (localStorage.getItem("TScart") === null) {
        TScart = [];
    } else {
        TScart = JSON.parse(localStorage.getItem("TScart"));
    }
    buildMain();
}




// build the html on scroll*
function buildMain() {
    if (posts === idx) {
        posts += 20;
        if (posts > list.length) {
            posts = list.length;
            document.querySelector("footer").style.display = "block";
        }
    }
    let str = "";
    for (; idx < posts; idx++) {
        // If theres no image, display a NO IMAGE picture
        if (list[idx].image === undefined || list[idx].image.length === 0 || list[idx].image[0] === "") {
            list[idx].image[0] = "../img/no-image.png";
        }
        str += `
        <div class="item" onclick="indexItem('${idx}');">
            <div style="display: none" class="item-id">${list[idx].id}</div>
            <div style="display: none" class="info">${list[idx].specs}${list[idx].name}${list[idx].description}</div>
            <div class="item-name">${list[idx].name}</div>
            <div class="image-container">
                <a href="details.html?index=${list[idx].name}">
                    <img src=${list[idx].image[0]} class="img-item front">
                    <div class="back"><div class="inner">${list[idx].name}, ${list[idx].description}</div></div>
                </a>
            </div>
            <div class="item-stock-container">
                <span>In stock:</span>
                <span class="item-stock">${list[idx].stock.toLocaleString('ro')}</span>
            </div>
            <div class="price-heart-wrapper">
                <div class="price-container">
                    <span>Price:&nbsp;</span>
                    <span class="price-item">${list[idx].price.toLocaleString('ro')}</span>
                    <span>&nbsp;RON</span>
                </div>
                <i class="far fa-heart"></i>
                <i class="fas fa-heart hidden"></i>
            </div>
        </div> 
        `
    }
    container.innerHTML += str;
    cartQuantity();
    loading.classList.remove("show");
}






// Search input function
function searchInput() {
    posts = list.length;
    buildMain();
    let searchText = document.querySelector(".search-input").value.toLowerCase().replace(/\s/g, '');
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < list.length; i++) {
        let item = items[i];
        let text = item.querySelector(".info").textContent.toLowerCase().replace(/\s/g, '');
        if (!text.includes(searchText)) {
            item.classList.add("hidden");
        }  else {
            item.classList.remove("hidden");
        }
    }
}




// Show Phones/Laptops/TVs items only and unhover the parent onclick child
filterPhones.addEventListener("click", (event) => {
    posts = list.length;
    buildMain();
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < list.length; i++) {
        let item = items[i];
        let id = item.querySelector(".item-id").innerText;
        if (event.target.innerText !== id) {
            if (event.target.innerText === "Phones") {
                return;
            }
            item.classList.add("hidden");
        } else {
            event.target.parentElement.classList.add("hidden");
            item.classList.remove("hidden");
        }
    }
    setTimeout(() => {
        event.target.parentElement.classList.remove("hidden");
    }, 100);
});
filterLaptops.addEventListener("click", (event) => {
    posts = list.length;
    buildMain();
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < list.length; i++) {
        let item = items[i];
        let id = item.querySelector(".item-id").innerText;
        if (event.target.innerText !== id) {
            if (event.target.innerText === "Laptops") {
                return;
            }
            item.classList.add("hidden");
        } else {
            event.target.parentElement.classList.add("hidden");
            item.classList.remove("hidden");
        }
    }
    setTimeout(() => {
        event.target.parentElement.classList.remove("hidden");
    }, 100);
});
filterTvs.addEventListener("click", (event) => {
    posts = list.length;
    buildMain();
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < list.length; i++) {
        let item = items[i];
        let id = item.querySelector(".item-id").innerText;
        if (event.target.innerText !== id) {
            if (event.target.innerText === "TVs") {
                return;
            }
            item.classList.add("hidden");
        } else {
            event.target.parentElement.classList.add("hidden");
            item.classList.remove("hidden");
        }
    }
    setTimeout(() => {
        event.target.parentElement.classList.remove("hidden");
    }, 200);
});





// Sort ASc and Desc by price
function sortAZ() {
    container.innerHTML = "";
    idx = 0;
    list.sort(dynamicSort("price"));
    filterByPrice();
}
function sortZA() {
    container.innerHTML = "";
    idx = 0;
    list.sort(dynamicSort("-price"));
    filterByPrice();
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}




// Shows only items between min and max price
function filterByPrice() {
    posts = list.length;
    buildMain();
    let min = document.querySelector(".sort-price-min").value;
    let max = document.querySelector(".sort-price-max").value;
    let items = document.querySelectorAll(".item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let price = parseInt(item.querySelector(".price-item").innerText.replace('.', ''));
        // if ((price > min || price < max) && (min != 0 || max != 0) && )
        if ((price < min || price > max) && (min != 0 || max != 0)) {
            item.classList.add("hidden");
        } else {
            item.classList.remove("hidden");
        }
    }
}




// Opens menu on clicking hamburger menu
function showMenu() {
    modal.style.display = "block";
    menu.style.display = "none";
}
  



// Hide the modal and closes the menu when clicking on modal
modal.addEventListener('click', (event) => {
    if (event.target.classList.contains("modal")) {
    modal.style.display = "none";
    menu.style.display = "block";
    }
});
  
  



// Displays the quantity from localStorage cart to Cart link and hamburger menu
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




// Shuffle list function to rearrange items differently on load/refresh 
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}



// Add event listener when scroll to bottom
window.addEventListener("scroll", () => {
    const {scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + window.pageYOffset  >= scrollHeight) {
        showLoading();
    }
});



// Add loading animation when scroll to bottom and load more items
function showLoading() {
    loading.classList.add("show");
    setTimeout(buildMain, 1000);
}
