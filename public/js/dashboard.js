var socket = io();
var spinner;
var INSTALL_ID = "FL0001"
var DEVICE_ID = "0001"

$(document).ready(function () {


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
        $('[data-toggle="tooltip"]').tooltip();
    }

    var opts = {
        lines: 13,
        length: 15,
        width: 8,
        radius: 15,
        scale: 1,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    }
    var target = document.getElementById('main-background');
    spinner = new Spinner(opts).spin(target);
    socket.emit("dashboard", {
        installID: INSTALL_ID
    });

});

var forecastData = "";
$.ajax({
  url: "https://api.darksky.net/forecast/32838489af6a091ef42f24fa4439e498/27.950575,-82.457178",
  dataType: "jsonp",
  success: function (data) {
      forecastData = data;
  }
});
var weatheUrl = 'https://api.darksky.net/forecast/32838489af6a091ef42f24fa4439e498/27.950575,-82.457178';

//NAV TABS
$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

socket.on("connect", function () {
    console.log("connected to socket.io");
});

socket.on("disconnect", function () {
    console.log("disconnected from socket.io");
});

socket.on("reconnect", function () {
    console.log("reconnected to socket.io");
});

//This is how we get the dashboard info
socket.on("dashboardResult", function (data) {
  spinner.stop();

//WATER CUBE ANIMATION
  var cnt=document.getElementById("count");
  var water=document.getElementById("water");
  var percent=cnt.innerText;
  //increase water level until you have reached your desired level
  var interval = setInterval(function(){
    percent++;
    cnt.innerHTML = percent;
    water.style.transform='translate(0'+','+(100-percent)+'%)';
    if(percent==87){//<- input dynamic number here
      clearInterval(interval);
    }
  },60);

// LINE CHART
  var lineDiv = $('#line-chart');
  var lineData = {
    labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],//<- input dynamic months here
    datasets: [
      {
        label: "GALLONS COLLECTED",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgba(99, 226, 255,0.4)",
        borderColor: "rgb(99, 226, 255)",
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: "rgb(99, 226, 255)",
        pointBackgroundColor: "rgb(99, 226, 255)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(99, 226, 255)",
        pointHoverBorderColor: "rgb(99, 226, 255)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [205, 230, 211, 168, 150, 153] //<- input dynamic data here
      },

      {
        label: "Zone 1",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(252, 132, 86, 0.5)",
        borderColor: "rgb(252, 132, 86)",
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: "rgb(252, 132, 86)",
        pointBackgroundColor: "rgb(252, 132, 86)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(252, 132, 86)",
        pointHoverBorderColor: "rgb(252, 132, 86)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [36, 33, 25, 21, 18, 15]//5-20
      },
      {
        label: "Zone 2",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(128, 236, 214, 0.5)",
        borderColor: "rgb(128, 236, 214)",
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: "rgb(128, 236, 214)",
        pointBackgroundColor: "rgb(128, 236, 214)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(128, 236, 214)",
        pointHoverBorderColor: "rgb(128, 236, 214)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [45, 55, 52, 50, 38, 45]//10-30
      },
      {
        label: "Zone 3",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(250, 180, 237, 0.5)",
        borderColor: "rgb(250, 180, 237)",
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBorderColor: "rgb(250, 180, 237)",
        pointBackgroundColor: "rgb(250, 180, 237)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(250, 180, 237)",
        pointHoverBorderColor: "rgb(250, 180, 237)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [34, 43, 35, 39, 37, 22]
      }
    ]
  };
  var lineOptions =  {

      scales: {
        yAxis: [{
          scaleLabel: {
            display: true,
            labelString: 'GALLONS'
          }
        }]
      }
  }
  var LineChart = new Chart(lineDiv, {
        type: 'line',
        data: lineData,
        options: lineOptions
    });

// RADAR CHART
  // var radarDiv = $('#radar-chart');
  // var radarData = {
  //   labels: ["JAN","FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  //   datasets: [
  //       {
  //         label: "Zone 3",
  //         fill: true,
  //         lineTension: 0,
  //         backgroundColor: "rgba(250, 180, 237, 0.4)",
  //         borderColor: "rgb(250, 180, 237)",
  //         borderCapStyle: 'round',
  //         borderJoinStyle: 'round',
  //         pointBorderColor: "rgb(250, 180, 237)",
  //         pointBackgroundColor: "rgb(250, 180, 237)",
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: "rgb(250, 180, 237)",
  //         pointHoverBorderColor: "rgb(250, 180, 237)",
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [5, 9, 7, 12, 11, 8, 14, 13, 15, 9, 7, 2]//0-15
  //       },
  //       {
  //         label: "Zone 2",
  //         fill: true,
  //         lineTension: 0,
  //         backgroundColor: "rgba(128, 236, 214, 0.4)",
  //         borderColor: "rgb(128, 236, 214)",
  //         borderCapStyle: 'round',
  //         borderJoinStyle: 'round',
  //         pointBorderColor: "rgb(128, 236, 214)",
  //         pointBackgroundColor: "rgb(128, 236, 214)",
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: "rgb(128, 236, 214)",
  //         pointHoverBorderColor: "rgb(128, 236, 214)",
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [22, 25 ,14 ,18 ,12 ,17, 20, 30, 28, 25, 17, 20]//10-30
  //       },
  //       {
  //         label: "Zone 1",
  //         fill: true,
  //         lineTension: 0,
  //         backgroundColor: "rgba(99, 226, 255,0.4)",
  //         borderColor: "rgb(99, 226, 255)",
  //         borderCapStyle: 'round',
  //         borderJoinStyle: 'round',
  //         pointBorderColor: "rgb(99, 226, 255)",
  //         pointBackgroundColor: "rgb(99, 226, 255)",
  //         pointHoverRadius: 5,
  //         pointHoverBackgroundColor: "rgb(99, 226, 255)",
  //         pointHoverBorderColor: "rgb(99, 226, 255)",
  //         pointHoverBorderWidth: 2,
  //         pointRadius: 1,
  //         pointHitRadius: 10,
  //         data: [8, 10 ,9 ,8 ,12 ,15, 16, 13, 15, 11, 8, 10]//5-20
  //       }
  //   ]
  // };
  // var RadarChart = new Chart(radarDiv, {
  //     type: 'radar',
  //     data: radarData
  // });

  //FORECAST
  var weatherIcons = {
    "rain": "./images/rc_raining.svg",
    "heavyRain": "./images/rc_heavy_rain.svg",
    "lightning": "./images/rc_lightning.svg",
    "overcast": "./images/rc_overcast.svg",
    "sunny": "./images/rc_sunny.svg",
    "windy": "./images/rc_windy.svg"
  }
  var daysAry = [];
  getDays();
  daysAry.forEach(function(current, index){
    var day = current;
    var targetElement = "#" + "weather-" + index;
    var weatherSection = $(targetElement).children();
    var weatherIcon = forecastData.daily.data[index].icon;
    switch (weatherIcon) {
      case 'rain':
      case "snow":
      case "sleet":
        weatherSection.find('h2').eq(0).html("RAINY");
        weatherSection.find('img').attr('src', weatherIcons.rain)
        break;
      case "cloudy":
      case "fog":
      case "partly-cloudy-day":
      case "partly-cloudy-night":
        weatherSection.find('h2').eq(0).html("CLOUDY");
        weatherSection.find('img').attr('src', weatherIcons.overcast);
        break;
      case "clear-day":
      case "clear-night":
        weatherSection.find('h2').eq(0).html("SUNNY");
        weatherSection.find('img').attr('src', weatherIcons.sunny);
        break;
      case "wind":
        weatherSection.find('h2').eq(0).html("WINDY");
        weatherSection.find('img').attr('src', weatherIcons.windy);
        break;
      case "thunderstorm":
        weatherSection.find('h2').eq(0).html("STORMY");
        weatherSection.find('img').attr('src', weatherIcons.lightning);
        break;
      default:
        weatherSection.find('h2').eq(0).html("SUNNY");
        weatherSection.find('img').attr('src', weatherIcons.sunny);
        break;
    }
    var rainProbability = forecastData.daily.data[index].precipProbability;
    rainProbability = Math.floor(rainProbability * 100);
    var rainIntensity = forecastData.daily.data[index].precipIntensityMax;
    rainIntensity = rainIntensity * 24;
    rainIntensity = rainIntensity.toFixed(2);
    switch (true) {
      case (rainIntensity == 0):
        weatherSection.find('.circle').css({height: "1px", width: "1px"})
        break;
      case (rainIntensity < 0.25):
        weatherSection.find('.circle').css({height: "5px", width: "5px"})
        break;
      case (rainIntensity < 0.5):
          weatherSection.find('.circle').css({height: "10px", width: "10px"})
        break;
      case (rainIntensity < 1):
          weatherSection.find('.circle').css({height: "15px", width: "15px"})
        break;
      case (rainIntensity >= 1):
          weatherSection.find('.circle').css({height: "20px", width: "20px"})
        break;
      default:
        weatherSection.find('.circle').css({height: "5px", width: "5px"})
        break;
    }
    weatherSection.find("h1").html(day);
    weatherSection.find('h2').eq(1).html(rainProbability + "%");
    weatherSection.find('h2').eq(2).html(rainIntensity + " IN");

  })

  function getDays() {
    for (var i = 0; i < 7; i++) {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        daysAry.push(dayAsString(currentDate.getDay()));
    }
    return daysAry;
  }

  function dayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "SUN";
    weekdays[1] = "MON";
    weekdays[2] = "TUE";
    weekdays[3] = "WED";
    weekdays[4] = "THU";
    weekdays[5] = "FRI";
    weekdays[6] = "SAT";

    return weekdays[dayIndex];
  }
});

function manualOpen(zone) {
    socket.once("openValveResult", function (data) {
        if (data.success !== true) {
            alert(data.errorMessage || "Error");
        }
    });

    socket.emit("openValve", {
        zone: zone,
        installID: INSTALL_ID
    });
}

function manualClose(zone) {

    socket.once("closeValveResult", function (data) {
        if (data.success !== true) {
            alert(data.errorMessage || "Error");
        }
    });
    socket.emit("closeValve", {
        zone: zone,
        installID: INSTALL_ID
    });
}

function setLength(length, zone) {
    socket.emit("updateLength", {
        zone: zone,
        length: length,
        installID: INSTALL_ID
    });
}

function setTime(time, zone) {
    socket.emit("updateTime", {
        zone: zone,
        length: length,
        installID: INSTALL_ID
    });
}
