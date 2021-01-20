let modal = document.querySelector(".modal");
let form = document.querySelector("form");
let fullList = {};
let position = -1;
let arr;
let finished;
let url = "https://shopping-list-bc921-default-rtdb.europe-west1.firebasedatabase.app/";

async function getFullList() {
    const res = await fetch(url + ".json");
        fullList = await res.json();
        if(fullList === null) {
            fullList = {};
        }
    build();
}
function build() {
    let list = document.querySelector("ol");
    let str = "";
    for (let [i, elem] of Object.entries(fullList)) {
        str += `
            <div class="listDiv animate__animated ${elem.removed}">
                <span class="iconify editIcon" data-icon="ant-design:edit-outlined" style="color: green;" onclick="edit('${i}');"></span>
                <li class="itemText ${elem.completed}" onclick="mark('${i}');" > ${elem.item}</li>
                <div>
                    <div class="moreInfo" >
                        <span class="infoIcon">i</span>
                        <span class="infoText">${elem.info}</span>
                    </div>
                </div> 
                <span class="iconify deleteMark" onclick="del('${i}');" data-icon="si-glyph:delete" data-inline="true"></span>
            </div>
        `
    }
    list.innerHTML = str;
}

/////// Shows form
function showform() {
    form.classList.add("open");
    modal.classList.add("open");
}

////// Add item in the list
async function addListItem() {
    let item = document.querySelector(".item").value; 
    let info = document.querySelector(".textarea").value;
    const res = await fetch(url + ".json", {
        method: "POST",
        body: JSON.stringify({
            "item" : item,
            "info" : info
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    await res.json();
    await getFullList();
    modal.classList.remove("open");
    form.classList.remove("open");
    form.reset();
}


////// Mark item
async function mark(idx) {
    let fl = fullList[idx];
    if(fl.completed === "completed") {
        fl.completed = '';
    } else {
        fl.completed = "completed";
    }
    const res = await fetch(url + idx + ".json", {
        method: "put",
        body: JSON.stringify({
            "item" : fl.item,
            "info" : fl.info,
            "completed" : fl.completed
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await res.json();
    await getFullList();
}

////// Show edit 'form'
function edit(idx) {
    let fl = fullList[idx];
    document.querySelector(".item2").value = fl.item;
    document.querySelector(".textarea2").value = fl.info;
    finished = fl.completed;
    document.querySelector(".form2").style.display = "flex";
    modal.classList.add("open");
    position = idx;
}


////// Edit item
async function edit2(){
    let x = {};
    x.item = document.querySelector(".item2").value;
    x.info = document.querySelector(".textarea2").value;
    x.completed = finished;
    const res = await fetch(url + position + ".json", {
        method: "PUT",
        body: JSON.stringify(x),
        headers: {'Content-Type': 'application/json'},
    });
    await res.json();
    await getFullList();
    document.querySelector("#form2").style.display = "none";
    modal.classList.remove("open");
}

////// Delete item
async function del(idx) {
    let fl = fullList[idx];
    fl.removed = "animate__backOutLeft";
    const res = await fetch(url + idx + ".json", {
        method: "put",
        body: JSON.stringify({
            "item" : fl.item,
            "info" : fl.info,
            "completed" : fl.completed,
            "removed" : fl.removed
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await res.json();
    await getFullList();
    setTimeout(async function() {
        const res = await fetch(url + idx + ".json", {
        method: "DELETE"
        
        });
    await res.json();
    await getFullList();
    }, 500);
}


//// Modal Layer
modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")){
        modal.classList.remove("open");
        form.classList.remove("open");
        document.querySelector(".form2").style.display = "none";
    }
});

