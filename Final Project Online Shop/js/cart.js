let quantity = document.querySelectorAll(".quantity");
const modal = document.querySelector(".modal");
const menu = document.querySelector(".menu-icon");
let TScart = [];
const url = "https://online-shop-424e1-default-rtdb.europe-west1.firebasedatabase.app/";
let list = []; 

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
      buildCart();
}



function buildCart() {
      let qty = 0;
      if (TScart.length === 0) {
            var totalPrice = 0;
      } else {
            var totalPrice = 15;
      }
      if (TScart.length > 0) {
            for (let i = 0; i < TScart.length; i++) {
                  qty += Number(TScart[i].quantity);
            }
      } else {
            qty = 0;
      }
      TScart = JSON.parse(localStorage.getItem("TScart"));
      let str = "";
      for (let i = 0; i < TScart.length; i++) {
            totalPrice += TScart[i].product.price * TScart[i].quantity;
            str += `
                  <tr>
                        <td><a href="details.html?index=${TScart[i].product.name}" class="link-item">${TScart[i].product.name}</a></td>
                        <td><span class="price">${TScart[i].product.price.toLocaleString('ro')}</span>&nbsp;RON</td>
                        <td class="quantity-wrapper">
                              <p class="increase" onclick="increase('${i}');"><i class="fas fa-plus"></i></p>
                              <input type="number" class="quantity" onfocus="calculate('${i}');" oninput="calculate('${i}');" value="${TScart[i].quantity}" min="1"/>
                              <p class="decrease" onclick="decrease('${i}');"><i class="fas fa-minus"></i></p>
                        </td>
                        <td class="remove-btn" onclick="removeItem('${i}');">Remove</td>
                  </tr>
            `
      }
      
      document.querySelector("tbody").innerHTML = str;
      document.querySelector(".total-items").innerText = qty;
      document.querySelector(".total-price").innerText = totalPrice.toLocaleString('ro');
}
            
function calculate(idx) {
      let cart = window.localStorage.getItem("TScart");
      if (cart !== null) {
            let TScart = JSON.parse(cart);
            TScart[idx].quantity = document.querySelectorAll(".quantity")[idx].value;
            window.localStorage.setItem('TScart', JSON.stringify(TScart));
      }
      buildCart();
}

function removeItem(idx) {
      TScart.splice(idx, 1);
      localStorage.setItem("TScart", JSON.stringify(TScart));
      buildCart();
}


async function buy() {
      if (TScart.length === 0) {
            return;
      }
      let index = [];
      let lsName = "";
      let newStock = "";
      for (let i = 0; i < TScart.length; i++) {
            lsName = TScart[i].product.name;
            index = list.findIndex(x => x.name == lsName);
            newStock = list[index].stock - TScart[i].quantity;
            await ajax(url + index, "PATCH", {
                  "stock": Number(newStock)
            });
      }
      window.localStorage.removeItem('TScart');
      let loader = document.querySelector(".lds-ring");
      loader.style.display = "inline-block";
      setTimeout(() => {
            document.querySelector(".message").style.display = "flex";
            loader.style.display = "none";
      }, 1000);
}

function confirmBuy() {
      window.location.href = "main.html";
}

function increase(idx) {
      document.querySelectorAll(".quantity")[idx].value = parseInt(document.querySelectorAll(".quantity")[idx].value) + 1;
      document.querySelectorAll(".quantity")[idx].addEventListener('focus', calculate(idx));
}

function decrease(idx) {
      if (document.querySelectorAll(".quantity")[idx].value < 2) {
            return;
      }
      document.querySelectorAll(".quantity")[idx].value = parseInt(document.querySelectorAll(".quantity")[idx].value) - 1;
      document.querySelectorAll(".quantity")[idx].addEventListener('focus', calculate(idx));
}




// Shows menu on menu click
function showMenu() {
      modal.style.display = "block";
      menu.style.display = "none";
}

modal.addEventListener('click', (event) => {
      if (event.target.classList.contains("modal")) {
        modal.style.display = "none";
        menu.style.display = "block";
      }
});