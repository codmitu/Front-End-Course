const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
let list = []; 
let position = -1;
const idValid = document.querySelector(".id-form");
const nameValid = document.querySelector(".name-form");
const priceValid = document.querySelector(".price-form");

async function ajax(url, method, body) {
    const res = await fetch(url + ".json", {
        method: method,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    return await res.json();
}
async function getList(idx) {
    list = await ajax(url);
    if (list === null) {
      list = [];
    }
    buildAdmin(idx);
}


function buildAdmin(idx) {
  let str = "";
  for (let i = 0; i < list.length; i++) {
    let image = list[i].image;
    let strImage = "";
    for (let k = 0; k < image.length; k++) {
      strImage += `<img src="${image[k]}"/>`;
    }
    let spec = list[i].specs;
    let strSpecs = "";
    for (let j = 0; j < spec.length; j++) {
     
        strSpecs += `<span>${spec[j]}; </span>`;
      
    }

    str += `
      <tr class="table-row">
        <td>${list[i].name}</td>
        <td class="description">${list[i].description}</td>
        <td class="specs">${strSpecs}</td>
        <td><span class="price">${list[i].price.toLocaleString('ro')}</span><span>&nbsp;RON</span></td>
        <td class="stock">${list[i].stock.toLocaleString('ro')}</td>
        <td class="images-container">
          ${strImage}
        </td>
        <td class="buttons">
            <button onclick="editItem('${i}');" onmouseover="refresh('${i}');">Edit</button>
            <button onclick="deleteItem('${i}');">Remove</button>
        </td>
      </tr>
    `
  } 
  document.querySelector("tbody").innerHTML = str;
}

// Displays the form
function addProduct() {
  position = -1;
  modal.style.display = "flex";
}
function resetForm() {
  form.reset();
  position = -1;
}

// Add product to the list
async function addNewProduct() {
  if (idValid.value === "") {
    errorID();
  } 
  if (priceValid.value === "") {
    errorPrice();
  }
  if (nameValid.value === "") {
    errorName();
  }
  if (idValid.value === "" || priceValid.value === "" || nameValid.value === "") {
    return;
  }
  let id = document.querySelector(".id-form").value;
  let name = document.querySelector(".name-form").value;
  let description = document.querySelector(".description-form").value;
  let spec = document.querySelectorAll(".specs-form");
  let specs = [].map.call(spec, function(input) {
    return input.value;
  });
  let price = document.querySelector(".price-form").value;
  let stock = document.querySelector(".stock-form").value;
  let image = document.querySelectorAll(".image-form");
  let images = [].map.call(image, function(input) {
    return input.value;
  });
  if (position > -1) {
    await ajax(url + position, "PUT", {
      "id": id,
      "name": name,
      "description": description,
      "specs": specs,
      "price": Number(price),
      "stock": Number(stock),
      "image": images
    });
    document.querySelectorAll(".table-row")[position].classList.add("flash");
  } else {
    await ajax(url + list.length, "PUT", {
      "id": id,
      "name": name,
      "description": description,
      "specs": specs,
      "price": Number(price),
      "stock": Number(stock),
      "image": images
    });
  }
  await getList();
  modal.style.display = "none";
}

async function editItem(idx) {
  let li = await ajax(url + idx);
  document.querySelector(".id-form").value = li.id;
  document.querySelector(".name-form").value = li.name;
  document.querySelector(".description-form").value = li.description;
  for (let i = 0; i < li.specs.length; i++) {
    document.querySelectorAll(".specs-form")[i].value = li.specs[i];
  }
  document.querySelector(".price-form").value = li.price;
  document.querySelector(".stock-form").value = li.stock;
  for (let i = 0; i < li.image.length; i++) {
    document.querySelectorAll(".image-form")[i].value = li.image[i];
  }
  modal.style.display = "flex";
  position = idx;
}


async function deleteItem(idx) {
  if (confirm(`Delete product "${list[idx].name}"`) === true) {
    await ajax(url + idx, "DELETE");
    await getList();
  }
}



// hide the modal when clicking it
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains("modal")) {
    modal.style.display = "none";
  }
});

// ID Select validator 
function errorID() {
  idValid.classList.add("invalid");
  setTimeout(() => {
    idValid.classList.remove("invalid");
  }, 2000);
}
function errorName() {
  nameValid.classList.add("invalid");
  setTimeout(() => {
    nameValid.classList.remove("invalid");
  }, 2000);
}
function errorPrice() {
  priceValid.classList.add("invalid");
  setTimeout(() => {
    priceValid.classList.remove("invalid");
  }, 2000);
}


async function refresh(idx) {
  let list2 = await ajax(url + idx);
  document.querySelectorAll(".stock")[idx].innerText = list2.stock;
}