const patternNames = /^([A-Za-z]{3}[ .'éàëA-Za-z-]*)$/;
const patternPhoneNumber = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
// const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
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
    if (window.innerWidth < 800 && agenda.length > 0) {
        document.querySelector(".left").classList.add("open2");
        document.querySelector(".right").classList.add("open2");
    } else if (agenda.length > 0 && window.innerWidth > 800){
        document.querySelector(".left").classList.add("open");
        document.querySelector(".right").classList.add("open");
    } else {
        document.querySelector(".left").classList.remove("open");
        document.querySelector(".right").classList.remove("open");
        document.querySelector(".left").classList.remove("open2");
        document.querySelector(".right").classList.remove("open2");
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
    }
    build();
    // to defocus phone input after pressing enter
    if (document && document.activeElement) {
        document.activeElement.blur();
    }
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
    document.querySelector("button:nth-child(1)").disabled = true;
    document.querySelector("button:nth-child(1)").classList.add("inactive");
    document.querySelector("button:nth-child(2)").classList.add("active");
    position = idx;
}
// edit contacts faze 2
function edit2() {
    if (document.querySelectorAll(".invalid").length === 0 && 
    document.querySelectorAll(".valid").length > 0  && 
    document.querySelector("#input1").value !== "" &&
    document.querySelector("#input2").value !== "" &&
    document.querySelector("#input3").value !== "") {
        let contacts = agenda[position];
        contacts.first = document.querySelector("#input1").value;
        contacts.second = document.querySelector("#input2").value;
        contacts.phone = document.querySelector("#input3").value;
        // position = -1;    
        build();
    } else {
        return false;
    }
    document.querySelector("button:nth-child(1)").disabled = false;
    document.querySelectorAll("li")[position].classList.add("animate__flash");

}

// Delete contacts with animation. 
// replace() is to show names capitalized in the confirm message
function del(idx) {
    if (confirm(`Delete ${agenda[idx].first.replace(/\b\w/g, l => l.toUpperCase())} ${agenda[idx].second.replace(/\b\w/g, l => l.toUpperCase())} from contacts?`) === true) {
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



// Loading circle animation with delay on form  animation (.left > form)
let loader = document.querySelector(".anim");
let loading = document.querySelector(".left");
loading.classList.add('js-loading');
window.addEventListener('load', function () {
    loader.parentElement.removeChild(loader);
    loading.classList.remove('js-loading');
});                     