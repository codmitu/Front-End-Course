let quantity = document.querySelectorAll(".quantity");
let TScart = [];

function buildCart() {
      let totalPrice = 15;
      TScart = JSON.parse(localStorage.getItem("TScart"));
      let str = "";
      for (let i = 0; i < TScart.length; i++) {
            totalPrice += TScart[i].product.price * TScart[i].quantity;
            // totalPrice += TScart[i].product.price * TScart[i].quantity;
            str += `
                  <tr>
                        <td><a href="" class="link-item">${TScart[i].product.name}</a></td>
                        <td><span class="price">${TScart[i].product.price.toLocaleString('ro')}</span>&nbsp;RON</td>
                        <td class="quantity-wrapper"><input type="number" class="quantity" id="quantity" onchange="calculate('${i}');" value="${TScart[i].quantity}" min="1"/></td>
                        <td class="remove-btn" onclick="removeItem('${i}');">Remove</td>
                  </tr>
            `
      }
      document.querySelector("tbody").innerHTML = str;
      document.querySelector(".total-items").innerText = TScart.length;
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