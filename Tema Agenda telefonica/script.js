const patternNames = /^([A-Za-z]{3}[ .'éàëA-Za-z-]*)$/;
const patternPhoneNumber = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
// patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let form = document.querySelector("#form");
let agenda = [];
let position = -1;
function build() {
    let ul = document.querySelector("ul");
    let li = "";
    for (let i = 0; i < agenda.length; i++) {
        li += `
                <li class="animate__animated">
                    <span class="iconify close" data-icon="gg:close" onclick="del(${i});" ></span>
                    <span class="iconify" data-icon="radix-icons:pencil-1" data-inline="false" onclick="edit1(${i})"></span>
                    <p>${agenda[i].first}</p>
                    <p>${agenda[i].second}</p>
                    <p>${agenda[i].phone}</p>
                </li>
        `        
    }
    ul.innerHTML = li;
    setTimeout(clearCheck, 1000);
    form.reset();
    document.querySelector("button:nth-child(1)").classList.remove("inactive");
    document.querySelector("button:nth-child(2)").classList.remove("active");
}

function addContact(form, event) {
    event.preventDefault();
    let first = document.querySelector("#input1").value;
    let second = document.querySelector("#input2").value;
    let phone = document.querySelector("#input3").value;
    if (document.querySelectorAll(".invalid").length === 0 && 
        document.querySelectorAll(".valid").length > 0) {
        agenda.push({
            "first" : first,
            "second" : second,
            "phone" : phone
        });
    } else {
        event.preventDefault();
    }
    build();
}
// function to clear inputs
function clearCheck() {
    document.querySelector(".validator1").classList.remove("valid");
    document.querySelector(".validator2").classList.remove("valid");
    document.querySelector(".validator3").classList.remove("valid");
    document.querySelector(".validator1").classList.remove("invalid");
    document.querySelector(".validator2").classList.remove("invalid");
    document.querySelector(".validator3").classList.remove("invalid");
}

// check validity names inputs when typing
function validName(elem) {
    let el = elem.nextElementSibling.lastElementChild.classList;
    if (elem.value.match(patternNames) && elem.value.length < 20) {
        el.add("valid");
        el.remove("invalid");
    } else if (elem.value === "") {
        el.remove("valid");
        el.remove("invalid");
    } else {
        el.remove("valid");
        el.add("invalid");
    }
}
// check validity phone input when typing
function validPhone(elem) {
    let el = elem.nextElementSibling.lastElementChild.classList;
    if (elem.value.match(patternPhoneNumber)) {
        el.add("valid");
        el.remove("invalid");
    } else if (elem.value === "") {
        el.remove("valid");
        el.remove("invalid");
    } else {
        el.remove("valid");
        el.add("invalid");
    }
}

// Edit contacts faze 1
function edit1(idx) {
    let contacts = agenda[idx];
    document.querySelector("#input1").value = contacts.first;
    document.querySelector("#input2").value = contacts.second;
    document.querySelector("#input3").value = contacts.phone;
    document.querySelector("button:nth-child(1)").classList.add("inactive");
    document.querySelector("button:nth-child(2)").classList.add("active");
    position = idx;
}
// edit contacts faze 2
function edit2(event) {
    if (document.querySelectorAll(".invalid").length === 0 && 
    document.querySelectorAll(".valid").length > 0) {
        let contacts = agenda[position];
        contacts.first = document.querySelector("#input1").value;
        contacts.second = document.querySelector("#input2").value;
        contacts.phone = document.querySelector("#input3").value;
        build();
    } 
        event.preventDefault();
}

// Delete contacts with animation
function del(idx) {
    if (confirm("Delete contact?") === true) {
        document.querySelectorAll("li")[idx].classList.add("animate__hinge");
        document.querySelectorAll("li")[idx].addEventListener("animationend", function() {
            agenda.splice(idx, 1);
            build();
        });
    } 
}

// prevent from submiting if 1 or more inputs are not filled
document.addEventListener('invalid', (function () {
    return function (e) {
      e.preventDefault();
    };
  })(), true);

// Loading animation
let loader = document.querySelector("section");
window.addEventListener('load', function () {
    loader.parentElement.removeChild(loader);
    document.querySelector(".border").style.display = "block";
});