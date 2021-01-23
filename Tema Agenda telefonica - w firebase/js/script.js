const patternNames = /^(?=.{3,20}$)[a-z]+(?:['-_.\s][a-z]+)*$/i;
const patternPhoneNumber = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
// const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let form = document.querySelector("#form");
let agenda = {};
let position = -1;
let url = "https://contact-list-a6588-default-rtdb.europe-west1.firebasedatabase.app/";
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let input1 = document.querySelector("#input1");
let input2 = document.querySelector("#input2");
let input3 = document.querySelector("#input3");
let btn1 = document.querySelector("#addBtn");
let btn2 = document.querySelector("#editBtn");
let val1 = document.querySelector(".validator1");
let val2 = document.querySelector(".validator2");
let val3 = document.querySelector(".validator3");

// function to add into database and update the build() function 
async function getAgenda() {
    const res = await fetch(url + ".json");
    agenda = await res.json();
    if (agenda === null) {
        agenda = {};
    }
    build();
}


// function to build the visible html on the webpage
function build() {
    let ul = document.querySelector("ul");
    let li = "";
    for (let [i, elem] of Object.entries(agenda)) {
        li += `
        <li class="animate__animated ${elem.removed} ${elem.anim}">
            <span class="iconify close" data-icon="gg:close" onclick="del('${i}');" ></span>
            <span class="iconify" data-icon="radix-icons:pencil-1" data-inline="false" onclick="edit1('${i}');"></span>
            <p>${elem.first}</p>
            <p>${elem.second}</p>
            <p>${elem.phone}</p>
        </li>
        `     
    }
    ul.innerHTML = li;
    if (Object.entries(agenda).length > 0 && window.innerWidth < 800) {
        left.classList.add("open2");
        right.classList.add("open2");
    } else if (Object.entries(agenda).length > 0 && window.innerWidth > 800){
        left.classList.add("open");
        right.classList.add("open");
    } else {
        left.classList.remove("open");
        right.classList.remove("open");
        left.classList.remove("open2");
        right.classList.remove("open2");
    }
    setTimeout(clearValidators, 1000);
    form.reset();
    btn1.classList.remove("inactive");
    btn2.classList.remove("active");
}

// function to add a contact to database
async function addContact() { 
    if (document.querySelectorAll(".invalid").length === 0 && 
    document.querySelectorAll(".valid").length > 0) {  
        let first = input1.value;
        let second = input2.value;
        let phone = input3.value;
        const res = await fetch(url + ".json", {
            method: "POST",
            body: JSON.stringify({
                "first": first,
                "second": second,
                "phone": phone
            }),
            headers : {'Content-Type': 'application/json'}
        });
        // to defocus phone input after pressing enter
        if (document && document.activeElement) {
            document.activeElement.blur();
        }
        await res.json();
        await getAgenda();
    }
}
// function to clear inputs
function clearValidators() {
    val1.classList.remove("valid");
    val2.classList.remove("valid");
    val3.classList.remove("valid");
    val1.classList.remove("invalid");
    val2.classList.remove("invalid");
    val3.classList.remove("invalid");
}

// check validity names inputs when typing
function validName(elem) {
        let el = elem.nextElementSibling.lastElementChild.classList;
        if (elem.value.match(patternNames)) {
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
// IF ELSE - press again to reset inputs
function edit1(idx) {
    let contacts = agenda[idx];
    position = idx;
    if (input1.value !== "" || input2.value !== "" || input3.value !== "") {
        btn1.disabled = false;
        btn1.classList.remove("inactive");
        btn2.classList.remove("active");
        form.reset();
        setTimeout(clearValidators, 1000);
    } else {
        input1.value = contacts.first;
        input2.value = contacts.second;
        input3.value = contacts.phone;
        btn1.disabled = true;
        btn1.classList.add("inactive");
        btn2.classList.add("active");
    }
}
// edit contacts faze 2
async function edit2() {
    if (input1.value.length > 2 && input2.value.length > 2 && input3.value.length > 9
        && input1.value.length < 21 && input2.value.length < 21 && input3.value.length < 16) {
        clearValidators();
        let x = {};
        x.first = input1.value;
        x.second = input2.value;
        x.phone = input3.value;
        const res = await fetch(url + position + ".json", {
            method: "PUT",
            body: JSON.stringify(x),
            headers: {'Content-Type': 'application/json'}
        });
        await res.json();
        await getAgenda();
        btn1.disabled = false;
    }
}

/////// DELETE
//// replace() is to show capitalized letters in confirm message
/// PUT is for showing an animation before deleting it
async function del(idx) {
    btn1.disabled = false;
    let ag = agenda[idx];
    ag.removed = "animate__hinge";
    if (confirm(`Delete ${agenda[idx].first.replace(/\b\w/g, l => l.toUpperCase())} ${agenda[idx].second.replace(/\b\w/g, l => l.toUpperCase())} from contacts?`) === true) {
        const res = await fetch(url + idx + ".json", {
            method: "PUT",
            body: JSON.stringify(ag),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json();
        await getAgenda();
        setTimeout(async function() {
            const res = await fetch(url + idx + ".json", {
            method: "DELETE"
            });
        await res.json();                      
        await getAgenda();
        }, 2000);
    } 
}


// prevent from submiting if 1 or more inputs are not filled
document.addEventListener('invalid', (function () {
    return function (e) {
      e.preventDefault();
    };
  })(), true);