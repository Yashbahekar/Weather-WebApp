let weather = {
  apiKey: "e8f19b52028e444a8174257832d28b18",


  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      // .then((data) => console.log(data));
      .then((data) => this.displayWeather(data));
  },

  GetOtherDay: function (city) {
    // navigator.geolocation.getCurrentPosition((success) => {
      var cityName;

      fetch(
        "https://api.opencagedata.com/geocode/v1/json?q='"+city+"&key=21f862c326ac45279af7e2fefc40332a"
      )
        .then((response) => response.json())
        .then((Data) => 
        // console.log(Data.results[0].geometry)
        this.showOtherDay(Data)
        // console.log(Data.results[0].geometry.lng)
        
        );

      
  },

  showOtherDay: function (Data) {

    let{lat,lng} = Data.results[0].geometry;
    // const{lat}=Data.results[0].geometry;
    // const{lng}=Data.results[0].geometry;
    console.log(lat,lng);

    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lng +
        "&exclude=hourly,minutely&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.daily);
        this.fourDays(data);
      });

  },

  fourDays: function(data){
    
    // let{}
    for(i = 1; i<5;i++){
      document.getElementById("day"+(i+1)+"day").innerHTML = "Day: "+ Number(data.daily[i].feels_like.day).toFixed(2)+ "°C";
    }
    for(i = 1; i<5;i++){
      document.getElementById("day"+(i+1)+"night").innerHTML = "Night: "+ Number(data.daily[i].feels_like.night).toFixed(2)+ "°C";
    }

    for(i = 1; i<5; i++){
      document.getElementById("day"+(i+1)+"Hum").innerHTML = "Humidity: "+ Number(data.daily[i].humidity).toFixed(0)+"%";
    }
    for(i = 1; i<5; i++){
      document.getElementById("day"+(i+1)+"Des").innerHTML = data.daily[i].weather[0].main;
    }
    for(i = 1; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.daily[i].weather[0].icon
      +".png";
  }

  },



  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "Km/h";

    document.querySelector(".weather").classList.remove("loading");

    if (name != "Pune") {
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/? " + name + " ')";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    this.GetOtherDay(document.querySelector(".search-bar").value);
    cityName = document.querySelector(".search-bar").value;
  },
};

weather.fetchWeather("Pune");
weather.GetOtherDay("Pune");



var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 1; i<5; i++){
        document.getElementById("Day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }


document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.body.style.backgroundImage =
  "url('https://source.unsplash.com/1600x900/?landscape')";

// JS for digital clock...........................................................................................................................

function updateClock() {
  var now = new Date();
  var dname = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    pe = "AM";

  if (hou >= 12) {
    pe = "PM";
  }
  if (hou == 0) {
    hou = 12;
  }
  if (hou > 12) {
    hou = hou - 12;
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];
  var week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var ids = [
    "dayname",
    "month",
    "daynum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];
  var values = [
    week[dname],
    months[mo],
    dnum.pad(2),
    yr,
    hou.pad(2),
    min.pad(2),
    sec.pad(2),
    pe,
  ];
  for (var i = 0; i < ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}
