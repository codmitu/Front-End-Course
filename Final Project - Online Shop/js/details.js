const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
let list = []; 
// console.log(location.search.substr(7));
let id = decodeURI(location.search.substr(7));
let TScart = [];
let product;

async function ajax(url, method, body) {
    const res = await fetch(url + ".json", {
        method: method,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    return await res.json();
}
async function getList() {
    list = await ajax(url);
    if (localStorage.getItem("TScart") === null) {
        TScart = [];
    } else {
        TScart = JSON.parse(localStorage.getItem("TScart"));
    }
    buildDetails();
}


// Build the html with onload function
function buildDetails() {
    // get index of the product by matching the product name its been clicked with the one in the array
    let index = list.findIndex(x => x.name == id);
    // Loop thru image array to get all images
    let image = list[index].image;
    let strImage = "";
    // and if theres no image, display a NO IMAGE picture
    if (image === undefined || image.length === 0 || image[0] === "") {
        strImage = `<img src="../img/no-image.png" class="no-image"/>`;
    } else {
        for (let i = 0; i < image.length; i++) {
            strImage += `<img src="${image[i]}"/>`;
        }
    }
    // loop thru specs array
    let specs = list[index].specs;
    let specsStr = "";
    for (let i = 0; i < specs.length; i++) {
        specsStr += `<p>${specs[i]}</p>`;
    }

  // Insert all values from database to details.html
    document.querySelector(".product-title").innerText = list[index].name + ", " + list[index].description;
    document.querySelector(".product-price").innerText = list[index].price.toLocaleString('ro');
    document.querySelector(".product-total-price").innerText = (list[index].price + 15).toLocaleString('ro') ;
    document.querySelector(".product-specs").innerHTML = specsStr;
    document.querySelector(".product-stock").innerText = list[index].stock.toLocaleString('ro');
    document.querySelector(".horizontal-scroll-wrapper").innerHTML = strImage;
    product = list[index];
}

// Change the total price with onchange function whenever quantity is changed
function findTotal() {
    let price = document.querySelector(".product-price").innerText;
    let quantity = document.querySelector('.quantity').value;
    document.querySelector(".product-total-price").innerText = parseFloat(price * quantity + 0.015).toFixed(3);
}

function addToCart() {
    let quantity = document.querySelector('.quantity').value;
    TScart.push({
        "product": product,
        "quantity": quantity
    });
    localStorage.setItem("TScart", JSON.stringify(TScart));
}