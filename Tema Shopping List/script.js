let modal = document.querySelector(".modal");
let adauga = document.querySelector("form");
let fullList = [];
let position = -1;
let arr;

function build() {
    let list = document.querySelector("ol");
    let str = "";
    for (let i = 0; i < fullList.length; i++) {
        str += `
            <div class="listDiv">
                <span class="iconify checkIcon" data-icon="ant-design:edit-outlined" style="color: green;" onclick="edit(${i});"></span>
                <li class="itemText" onclick="mark(${i});" style="${fullList[i].arr}">${fullList[i].item} </li>
                <div>
                    <div class="moreInfo" >
                        <span class="infoIcon">i</span>
                        <span class="infoText">${fullList[i].info}</span>
                    </div>
                </div> 
                <span class="iconify deleteMark" onclick="del(${i});" data-icon="si-glyph:delete" data-inline="true"></span>
            </div>
        `
    }
    list.innerHTML = str;
}
/////// Sort A-Z
function sortAZ() {
    fullList.sort(dynamicSort("item"));
    build();
}


/////// Sort Z-A
function sortZA() {
    fullList.sort(dynamicSort("-item"));
    build();
}

///// sort by elements of objects in an array
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

/////// Shows form
function addItem() {
    adauga.classList.add("open");
    modal.classList.add("open");
}


////// Add item in the list
function addListItem() {
    let item = document.querySelector(".item").value; 
    let info = document.querySelector(".textarea").value;
    fullList.push({
        "item" : item,
        "info" : info,
    });
    modal.classList.remove("open");
    adauga.classList.remove("open");
    document.querySelector("form").reset();
    build();
}

////// Show edit div
function edit(idx) {
    let fl = fullList[idx];
    document.querySelector(".item2").value = fl.item;
    document.querySelector(".textarea2").value = fl.info;
    document.querySelector(".form2").style.display = "flex";
    modal.classList.add("open");
    position = idx;
}


////// Edit item
function edit2(){
    let fl = fullList[position];
    fl.item = document.querySelector(".item2").value;
    fl.info = document.querySelector(".textarea2").value;
    document.querySelector("#form2").style.display = "none";
    modal.classList.remove("open");
    build();
}

////// Check item
function mark(idx) {
    let fl = fullList[idx];
    let li = document.querySelectorAll("li")[idx];
    if(li.style.color === "lightgrey"){
        fl.arr =  "text-decoration: none; color: black";
    } else {
        fl.arr = "text-decoration: line-through; color: lightgrey";
    }
    build();
}


////// Delete item
function del(idx) {
    document.querySelectorAll(".listDiv")[idx].classList.add("remove");
    document.querySelectorAll(".listDiv")[idx].addEventListener("transitionend", function() {
        fullList.splice(idx, 1);
        build();
    });
}


//// Emoticon
document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball() {
    var eye = document.querySelectorAll('.eye');
    eye.forEach(function(eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) -80;
        eye.style.transform = "rotate(" + rot + "deg)";
    });
}


//// Modal Layer
modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")){
        modal.classList.remove("open");
        adauga.classList.remove("open");
        document.querySelector(".form2").style.display = "none";
    }
});

