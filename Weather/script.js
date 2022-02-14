const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("img"),
    arrowBack = wrapper.querySelector("header i");
let api;

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
    toast();
}
}

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        toast();
    }
});

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b4036768b0c5f42c9fe9c54344b00e3`;
    fetchData();
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9b4036768b0c5f42c9fe9c54344b00e3`;
    fetchData();
}

function onError(error) {
    infoTxt.classList.add("error");
    infoTxt.innerText = error.message;
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "Something went wrong";
    });
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        const city = info.name;
        let country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;
        for (i in countryList) { if (i == country) { country = countryList[i]; } }
        if (id == 800) {
            wIcon.src = "/Assets/Clear.svg";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "/Assets/Storm.svg";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "/Assets/Snow.svg";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "/Assets/Haze.svg";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "/Assets/Cloudy.svg";
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "/Assets/Rain.svg";
        }
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        setTimeout(() => {
            infoTxt.classList.remove("pending", "error");
            infoTxt.innerText = "";
            wrapper.classList.add("active");
        }, 800);
    }
}

function toast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}