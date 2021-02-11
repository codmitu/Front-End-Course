const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
let list = []; 
let position = -1;

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
    if (list === null) {
      list = [];
    }
    buildAdmin();
}


function buildAdmin() {
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
      if (spec[j] === "") {
        continue;
      } else {
        strSpecs += `<span>${spec[j]}; </span>`;
      }
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
            <button onclick="editItem('${i}');">Edit</button>
            <button onclick="deleteItem('${i}');">Remove</button>
        </td>
      </tr>
    `
  } 
  document.querySelector("tbody").innerHTML = str;
}

// Displays the form
function addProduct() {
  modal.style.display = "flex";
}
function resetForm() {
  form.reset();
}

// Add product to the list
async function addNewProduct() {
  if (document.querySelector(".id-form").value === "" || document.querySelector(".price-form") === "") {
    error();
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

function editItem(idx) {
  let li = list[idx];
  document.querySelector(".id-form").value = li.id;
  document.querySelector(".name-form").value = li.name;
  document.querySelector(".description-form").value = li.description;
  document.querySelectorAll(".specs-form")[0].value = li.specs[0];
  document.querySelectorAll(".specs-form")[1].value = li.specs[1];
  document.querySelectorAll(".specs-form")[2].value = li.specs[2];
  document.querySelectorAll(".specs-form")[3].value = li.specs[3];
  document.querySelectorAll(".specs-form")[4].value = li.specs[4];
  document.querySelectorAll(".specs-form")[5].value = li.specs[5];
  document.querySelectorAll(".specs-form")[6].value = li.specs[6];
  document.querySelectorAll(".specs-form")[7].value = li.specs[7];
  document.querySelectorAll(".specs-form")[8].value = li.specs[8];
  document.querySelectorAll(".specs-form")[9].value = li.specs[9];
  document.querySelector(".price-form").value = li.price;
  document.querySelector(".stock-form").value = li.stock;
  document.querySelectorAll(".image-form")[0].value = li.image[0];
  document.querySelectorAll(".image-form")[1].value = li.image[1];
  document.querySelectorAll(".image-form")[2].value = li.image[2];
  document.querySelectorAll(".image-form")[3].value = li.image[3];
  document.querySelectorAll(".image-form")[4].value = li.image[4];
  document.querySelectorAll(".image-form")[5].value = li.image[5];
  modal.style.display = "flex";
  position = idx;
}

async function deleteItem(idx) {
  if (confirm(`Delete product ${list[idx].name}`) === true) {
    await ajax(url + idx, "DELETE");
    await getList();
  }
}



// Remove created inputs and hides the modal when clicking it
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains("modal")) {
    modal.style.display = "none";
  }
});

// ID Select validator 
function error() {
  document.querySelector(".id-form").style.border = "2px solid red";
  document.querySelector(".price-form").style.border = "2px solid red"
  setTimeout(() => {
    document.querySelector(".id-form").style.border = "1px solid black";
    document.querySelector(".price-form").style.border = "2px solid black"
  }, 2000);
}

