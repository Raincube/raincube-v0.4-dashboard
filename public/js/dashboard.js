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

$.ajax({
  url: "https://api.darksky.net/forecast/32838489af6a091ef42f24fa4439e498/27.950575,-82.457178",
  dataType: "jsonp",
  success: function (data) {
      console.log('here');
      console.log(data);
  }
});
var weatheUrl = 'https://api.darksky.net/forecast/32838489af6a091ef42f24fa4439e498/27.950575,-82.457178';//&origin=*????

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
    console.log(data);
    var cnt=document.getElementById("count");
    var water=document.getElementById("water");
    var percent=cnt.innerText;
    var interval;
    interval=setInterval(function(){
      percent++;
      cnt.innerHTML = percent;
      water.style.transform='translate(0'+','+(100-percent)+'%)';
      if(percent==87){
        clearInterval(interval);
      }
    },60);

  // LINE CHART
    var lineDiv = $('#line-chart');
    var lineData = {
      labels: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV"],
      datasets: [
          {
            label: "GALLONS COLLECTED",
            fill: true,
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
            data: [432, 470, 454, 378, 410, 350]
          }
      ]
    };
    var lineOptions =  {
        legend: {
            display: false
        },
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
  var radarDiv = $('#radar-chart');
  var radarData = {
    labels: ["JAN","FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
        {
          label: "Zone 3",
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(250, 180, 237, 0.4)",
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
          data: [5, 9, 7, 12, 11, 8, 14, 13, 15, 9, 7, 2]//0-15
        },
        {
          label: "Zone 2",
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(128, 236, 214, 0.4)",
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
          data: [22, 25 ,14 ,18 ,12 ,17, 20, 30, 28, 25, 17, 20]//10-30
        },
        {
          label: "Zone 1",
          fill: true,
          lineTension: 0,
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
          data: [8, 10 ,9 ,8 ,12 ,15, 16, 13, 15, 11, 8, 10]//5-20
        }
    ]
  };
  var RadarChart = new Chart(radarDiv, {
      type: 'radar',
      data: radarData
  });

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
