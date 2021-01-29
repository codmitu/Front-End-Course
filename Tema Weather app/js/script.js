let tempDegree = document.querySelector('.tempDegree');
let tempDesc = document.querySelector('.tempDescription');
let city = document.querySelector('.city');
let state = document.querySelector('.country');
let Humidity = document.querySelector('.Humidity');
let Pressure = document.querySelector('.Pressure');
let tempMax = document.querySelector('.tempMax');
let tempMin = document.querySelector('.tempMin');
let img = document.querySelector('img');
let input = document.querySelector('input');
let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');
let api;

// search on enter key
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      btn1.click();
    }
});

// get current date and next 5 days as type: Jan 02 2020
let today = new Date();
let x1 = today.toString().slice(4, 15);
let d2 = new Date(today.getTime() + (24 * 60 * 60 * 1000));
let x2 = d2.toString().slice(4, 15);
let d3 = new Date(today.getTime() + (24 * 60 * 60 * 1000)*2);
let x3 = d3.toString().slice(4, 15);
let d4 = new Date(today.getTime() + (24 * 60 * 60 * 1000)*3);
let x4 = d4.toString().slice(4, 15);
let d5 = new Date(today.getTime() + (24 * 60 * 60 * 1000)*4);
let x5 = d5.toString().slice(4, 15);
let d6 = new Date(today.getTime() + (24 * 60 * 60 * 1000)*5);
let x6 = d6.toString().slice(4, 15);

// inspired by https://www.youtube.com/watch?v=wPElVpR1rwA&list=PLTccUFlC4_WmV9ki6lYYJaonM7Y8QrUY_&index=141&t=1802s&ab_channel=DevEd
// load current weather on user location on page load
window.addEventListener('load', async () => {
    document.querySelector("#weekSection").classList.add("hidden");
    navigator.geolocation.getCurrentPosition(async position => {
        let long  = position.coords.longitude;
        let lat = position.coords.latitude;
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=69518b1f8f16c35f8705550dc4161056&lang=ro&units=metric`;
        let res = await fetch(api);
        let json = await res.json();
        tempDegree.textContent = json.main.temp;
        city.textContent = json.name;
        state.textContent = json.sys.country;
        tempDesc.textContent = json.weather[0].description;
        Pressure.textContent = json.main.pressure;
        Humidity.textContent = json.main.humidity;
        tempMax.textContent = json.main.temp_max;
        tempMin.textContent = json.main.temp_min;
        img.src = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
    });
    document.querySelector(".lds-ring").classList.add("hidden");
});

// display current weather and show more days if showMore is already unhidden
btn1.addEventListener('click', async () => {
    document.querySelector(".lds-ring").classList.remove("hidden");
    setTimeout(hideLoader, 2000);
    api = `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&lang=ro&units=metric&q=${input.value}`;
    let res = await fetch(api);
    let json = await res.json();
    tempDegree.textContent = json.main.temp;
    city.textContent = json.name;
    state.textContent = json.sys.country;
    tempDesc.textContent = json.weather[0].description;
    Pressure.textContent = json.main.pressure;
    Humidity.textContent = json.main.humidity;
    tempMax.textContent = json.main.temp_max;
    tempMin.textContent = json.main.temp_min;
    showMore(); // display more days weather
    img.src = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
    document.querySelector(".lds-ring").classList.add("hidden");
});

// display more days weather called on btn1
async function showMore() {
    if (document.querySelector("#weekSection").classList.contains("hidden")) {
        document.querySelector("#weekSection").classList.add("hidden");
    } else {
        document.querySelector("#weekSection").classList.remove("hidden");

    }
    document.querySelector(".lds-ring").classList.remove("hidden");
    api = `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&lang=ro&units=metric&q=${input.value}`;
    let res = await fetch(api);
    let json = await res.json();
    let days1 = x1;
    let days2 = x2;
    let days3 = x3;
    let days4 = x4;
    let days5 = x5;
    let days6 = x6;
    let counter = 1;
    for (let i = 0; i < json.list.length; i++) {
        if (json.list[i].dt_txt.slice(11) === "00:00:00" && document.querySelector("#weekSection .dayCol1").value !== "") {
            counter++;
        }
        if (counter === 1) {
            days1 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon"/>
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol1").innerHTML = days1;
        } else if (counter === 2) {
            days2 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon"/>
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol2").innerHTML = days2;
        } else if (counter === 3) {
            days3 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon"/>
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol3").innerHTML = days3;
        } else if (counter === 4) {
            days4 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon" />
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol4").innerHTML = days4;
        } else if (counter === 5) {
            days5 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon" />
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol5").innerHTML = days5;
        } else if (counter === 6) {
            days6 += `
                <div class="day">
                    <div class="font">${json.list[i].dt_txt.slice(11, 16)}</div>
                    <img src="http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png" class="weekIcon"/>
                    <div class="weekDegrees">
                        <div>${json.list[i].main.temp}</div>
                        <span>°C</span>
                    </div>
                    <div class="font">${json.list[i].weather[0].description}</div>
                </div>
           
        `
            document.querySelector("#weekSection .dayCol6").innerHTML = days6;
        }   
    }
    
    document.querySelector("#map").classList.add("hidden");
    document.querySelector(".lds-ring").classList.add("hidden");
};

// toggles more days weather on/off
btn2.addEventListener('click', () => {
    document.querySelector("#weekSection").classList.toggle("hidden");
    document.querySelector("#map").classList.add("hidden");
})


// displays location map and toggles it
btn3.addEventListener('click', () => {
    document.querySelector(".lds-ring").classList.remove("hidden");

    let map = "";
    map += `
        <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="293" id="gmap_canvas" src="https://maps.google.com/maps?q=${input.value}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br><style>.mapouter{position:relative;text-align:right;height:293px;width:100%;}</style><style>.gmap_canvas {overflow:hidden;background:none!important;height:293px;width:100%;}</style></div></div>
    `
    document.querySelector("#map").innerHTML = map;
    
    document.querySelector("#map").classList.toggle("hidden");
    document.querySelector("#weekSection").classList.add("hidden");
    document.querySelector(".lds-ring").classList.add("hidden");
});

function hideLoader() {
    document.querySelector(".lds-ring").classList.add("hidden");
}