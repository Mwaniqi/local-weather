window.onload = function() {
  var lat;
  var lon;
  var urlPath;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(currLocation, error);
  } else {
    urlPath = 'https://fcc-weather-api.glitch.me';
  }
  // Get geolocation
  function currLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    urlPath = 'current?lat=' + lat + '&lon=' + lon;
    getWeather();
  }
  
  function error(err) {
    console.warn('Error:' + err);
  }

  function getWeather() {
    // AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://fcc-weather-api.glitch.me/api/' + urlPath, true);
    xhr.onload = function() {
      if(this.status == 200) { 
        var data = JSON.parse(this.responseText);
        // Show data on page
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('icon').innerHTML = '<img src=' + data.weather[0].icon + '>';
        document.getElementById('desc').innerHTML = data.weather[0].description;
        document.getElementById('temp').innerHTML = Math.round(data.main.temp);
        document.getElementById('lo').innerHTML = data.main.temp_min;
        document.getElementById('hi').innerHTML = data.main.temp_max;
        document.getElementById('humidity').innerHTML = data.main.humidity;
      }
    }
   
    xhr.onerror = function() {
      weatherBtn.innerHTML = "Oops, something went wrong";
      console.log(error);
    }
  
    xhr.send();
  };

  // toggle temperature units
  var btn = document.querySelector('button');
   btn.addEventListener('click', function() {
    var temp = document.getElementById('temp').textContent;
    var hiTemp = document.getElementById('hi').textContent;
    var loTemp = document.getElementById('lo').textContent;
    var hi = document.getElementById('hi');
    var lo = document.getElementById('lo');
    var newTemp = document.getElementById('temp');
    var units = document.getElementById('units').textContent;
    var newUnits = document.getElementById('units');
    // C to F
    var tempF = Math.round((temp * 1.8) + 32),
        hiTempF = Math.round((hiTemp * 1.8) + 32),
        loTempF = Math.round((loTemp * 1.8) + 32);

    //F to C
    var tempC = Math.round((temp - 32) * .5556);
        hiTempC = Math.round((hiTemp - 32) * .5556),
        loTempC = Math.round((loTemp - 32) * .5556);

    if (units == 'C') {
      newTemp.innerHTML = tempF;
      hi.innerHTML = hiTempF;
      lo.innerHTML = loTempF;
      newUnits.innerHTML = 'F';
    } else if(units == 'F') {
      newTemp.innerHTML = tempC;
      hi.innerHTML =hiTempC;
      lo.innerHTML = loTempC;
      newUnits.innerHTML = 'C';
    }
  });
};
