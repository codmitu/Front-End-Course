let firstName = document.querySelector('[name="first"]');
let lastName = document.querySelector('[name="last"]');
function check(elem, event, min, max) {
    let value = elem.value;
    if ((value.length < min || value.length > max) && value.length > 0) {
        elem.classList.add("invalid");
        elem.classList.remove("valid");
    } else if (value.length > 0){
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    }
}

function remBlurOnFoc(elem) {
    elem.classList.remove("valid");
    elem.classList.remove("invalid");
}

function send() {
    let username = firstName.value;
    document.getElementById("username").innerHTML = username;
    document.getElementById("prompt").style.visibility = "visible";
    document.querySelector("form").reset();
}

function closePrompt() {
    document.getElementById("prompt").style.visibility = "hidden";
}
 
