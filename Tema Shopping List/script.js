let fullList = [];
let position = -1;
function build() {
    let list = document.querySelector("ol");
    let str = "";
    for (let i = 0; i < fullList.length; i++) {
        str += `
            <div class="listDiv">
                <span class="iconify checkIcon" data-icon="ant-design:edit-outlined" style="color: green;" onclick="edit(${i});"></span>
                <li class="itemText" onclick="mark(${i});">${fullList[i].item}</li>
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


/////// Show form
function addItem() {
    document.querySelector("form").style.display = "flex";
    modal.classList.add("open");
    document.querySelector("form").reset();
    build();
    
}


////// Add item in the list
function addListItem() {
    let item = document.querySelector(".item").value; 
    let info = document.querySelector(".textarea").value;
    fullList.push({
        item : item,
        info : info
    });
    document.querySelector("form").style.display = "none";
    modal.classList.remove("open");
    build();
}

////// Show edit div
function edit(idx) {
    let fl = fullList[idx];
    document.querySelector(".item2").value = fl.item;
    document.querySelector(".textarea2").value = fl.info;
    document.querySelector("#form2").style.display = "flex";
    modal.classList.add("open");
    position = idx;
}


////// Edit item
function edit2(){
    let fl = fullList[position];
    fl.item =  document.querySelector(".item2").value;
    fl.info = document.querySelector(".textarea2").value;
    document.querySelector("#form2").style.display = "none";
    modal.classList.remove("open");
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

////// Check item
function mark(idx) {
    document.querySelectorAll("li")[idx].classList.toggle("completed");
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
let modal = document.querySelector(".modal");

modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")){
        modal.classList.remove("open");
        document.querySelector("#form2").style.display = "none";
        document.querySelector("form").style.display = "none";
    }
})

