// Variables
const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
let urlWishlist;
let userID;
let list = [];
let id = decodeURI(location.search.substr(7));
let TScart = [];
let product;
let wishList = [];
const modal = document.querySelector(".modal");
const menu = document.querySelector(".menu-icon-wrapper");


// AJAX function
async function ajax(url, method, body) {
    const res = await fetch(url + ".json", {
        method: method,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    return await res.json();
}



// get the list from database and shuffle it to display 4 other products randomly
// dont get the null value items (deleted products)
// get the products from local storage
async function getList() {
    list = await ajax(url + "Products");
    list = shuffle(list);
    list = list.filter(item => item !== null);
    if (localStorage.getItem("TScart") === null) {
        TScart = [];
    } else {
        TScart = JSON.parse(localStorage.getItem("TScart"));
    }
    buildDetails();
}



// Get user IP address to create a new database for user wislist products
$.getJSON('https://jsonip.com/?callback=?', function(data) {
    userID = JSON.stringify(data.ip).replace(/"/g, "");
    userID = userID.replace(/\./g, "");
});




// get wishlist from database to color item hearts
async function getWishlist() {
    wishList = await ajax(url + userID);
    if (wishList === null) {
        wishList = [];
    }
}



// Build the html with onload function
function buildDetails() {
    // get database index of the product by matching the product name its been clicked with the one in the local storage
    let index = list.findIndex(x => x.name == id);
    // Loop thru image array to get all images
    let image = list[index].image;
    let strImage = "";
    let dots = "";
    // and if theres no image, display a NO IMAGE picture
    if (image === undefined || image.length === 0 || image[0] === "") {
        strImage = `<img src="../img/no-image.png" class="no-image"/>`;
        dots = `<span class="dot" onclick="currentSlide(1)"></span>`;
    } else {
        let counter = 0;
        for (; counter < image.length; counter++) {
            if (image[counter] === "") {
                break;
            }
        }
        for (let i = 0; i < image.length; i++) {
            if (image[i] === "") {
                break;
            }
            strImage += `
            <div class="mySlides fade">
                <div class="numbertext">${i + 1} / ${counter}</div>
                <img src="${image[i]}">
            </div>`;
            dots += `<span class="dot" onclick="currentSlide('${i + 1}')"></span>`;
        }
    }
    // loop thru specs array
    let specs = list[index].specs;
    let specsStr = "";
    for (let i = 0; i < specs.length; i++) {
        specsStr += `<p>${specs[i]}</p>`;
    }
    // check if item is already in cart or wishlist to add style to buttons
    for (let j = 0; j < wishList.length; j++) {
        if (wishList[j] === null) {
            continue;
        } 
        if (wishList[j].name === list[index].name) {
            document.querySelector(".h1").classList.add("hidden");
            document.querySelector(".h2").classList.remove("hidden");
        }
    }
    for (let i = 0; i < TScart.length; i++) {
        if (TScart[i].product.name === list[index].name) {
            document.querySelector(".c1").classList.add("hidden");
            document.querySelector(".c2").classList.remove("hidden");
        }
    }
    // Insert all values from database to details.html
    document.querySelector(".product-title").innerText = list[index].name + ", " + list[index].description;
    document.querySelector(".product-price").innerText = list[index].price.toLocaleString('ro');
    document.querySelector(".product-total-price").innerText = (list[index].price + 15).toLocaleString('ro') ;
    document.querySelector(".product-specs").innerHTML = specsStr;
    document.querySelector(".product-stock").innerText = list[index].stock.toLocaleString('ro');
    document.querySelector(".container").innerHTML = strImage;
    document.querySelector(".dots").innerHTML = dots;
    product = list[index];



    // More items alike (if they match products id)
    let alikeItems = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] === null) {
            return;
        } else if (list[index].id === list[i].id && list[index].name !== list[i].name) {
            alikeItems.push(list[i]);
        }
    }
    let strItem = "";
    for (let i = 0; i < 4; i++) {
        if (list[i].image === undefined || list[i].image.length === 0 || list[i].image[0] === "") {
            list[i].image[0] = "../img/no-image.png";
        }
        strItem += `
        <div class="more-items">
            <p class="more-items-name">${alikeItems[i].name}</p>
            <a href="details.html?index=${alikeItems[i].name}">
                <img src="${alikeItems[i].image[0]}" class="more-items-image" alt="">
            </a>
            <div>
                <p>Price: <span class="more-items-price">${alikeItems[i].price.toLocaleString('ro')}</span> RON</p>
                <p>Stock: <span class="more-items-stock">${alikeItems[i].stock.toLocaleString('ro')}</span></p>
            </div>
        </div>
        `
    }
    document.querySelector(".more-items-container").innerHTML = strItem;
    cartQuantity();
}



// Change the total price with onchange function on input whenever quantity is changed
function findTotal() {
    if (document.querySelector(".product-stock").innerText === "0") {
        document.querySelector('.quantity').value = 1;
    }
    let stockNr = Number(document.querySelector(".product-stock").innerText);
    document.querySelector('.quantity').setAttribute("max", `${stockNr}`);
    let price = document.querySelector(".product-price").innerText;
    let quantity = document.querySelector('.quantity').value;
    document.querySelector(".product-total-price").innerText = parseFloat(price * quantity + 0.015).toFixed(3);
}



// Add to local storage button only if stock is more than 0, and wasnt already added, stores the full product + quantity
function addToCart() {
    if (product.stock === 0) {
        document.querySelector(".error-message").classList.add("visible");
        setTimeout(removeMessages, 3000);
        return;
    }
    for (let i = 0; i < TScart.length; i++) {
        if (TScart[i].product.name.includes(id)) {
            document.querySelector(".cart-duplicate-item").classList.add("visible");
            setTimeout(removeMessages, 3000);
            return;
        }
    }
    document.querySelector(".c1").classList.add("hidden");
    document.querySelector(".c2").classList.remove("hidden");
    document.querySelector(".message").classList.add("visible");
    setTimeout(removeMessages, 3000);
    let quantity = document.querySelector('.quantity').value;
    TScart.push({
        "product": product,
        "quantity": quantity
    });
    localStorage.setItem("TScart", JSON.stringify(TScart));
    cartQuantity();
}




// Add items to wishlist database 
async function addToWishlist() {
    document.querySelector(".h1").classList.add("hidden");
    document.querySelector(".h2").classList.remove("hidden");
    for (let i = 0; i < wishList.length; i++) {
        if (wishList[i] === null) {
            continue;
        } else if (wishList[i].name === product.name) {
            return;
        }
    }
    await ajax(url + userID + "/" + wishList.length, "PUT", {
        "name" : product.name
    });
    getWishlist();
}








// Shows menu on menu clicking the hamburger icon
function showMenu() {
    modal.style.display = "block";
    menu.style.display = "none";
}



// hides the modal and menu when clicking the modal
modal.addEventListener('click', (event) => {
    if (event.target.classList.contains("modal")) {
      modal.style.display = "none";
      menu.style.display = "block";
    }
});




// Displays the quantity from localStorage to Cart link and hamburger menu
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
    if (array === null) {
        return;
    }
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
}


// Remove messages after delay for addToCart button
function removeMessages() {
    document.querySelector(".message").classList.remove("visible");
    document.querySelector(".cart-duplicate-item").classList.remove("visible");
    document.querySelector(".error-message").classList.remove("visible");
}
