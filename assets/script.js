// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

var searchButton = $('#buttonSearch');
var citySearch = $('#citySearch');
var search = [];

searchButton.click(function createSearch(event) {
    event.preventDefault();
    var submittedSearch = citySearch.submit();
    var userChoice = submittedSearch.val().toLowerCase();

    search.push(userChoice);

    var searchedCity = $('<li>').addClass('searched-city').text(citySearch.val());
    $('#cityHistory').prepend(searchedCity);

    if ( $('searched-city') == citySearch.val()) {
        alert("You have picked this city");
    }

    console.log(search);

    displayCurrentInfo();
    displayUVInfo();
    displayWeeklyForecast();
 });

//Display current information based on search
  function displayCurrentInfo() {

   for (i = 0; i < search.length; i++) { 
     var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ search[i] +"&appid=" + APIKey;

    console.log(queryURL);

       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response){
           console.log(response);
           //Temp conversion
           var tempFah = ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(1);

           //Display info to page
            $('#current-city').text(response.name); //use moment.js for date
            $('#current-icon').attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            $('#tempToday').text("Temperature: " + tempFah + " ℉");
            $('#humToday').text("Humidity: " + response.main.humidity + "%");
            $('#wind-speed').text("Wind Speed: " + response.wind.speed + " MPH");
         }) 

        }
  }

//Display UV Index
function displayUVInfo() {

    for (i = 0; i < search.length; i++) { 
      var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ search[i] +"&appid=" + APIKey;
 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

        var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + (response.coord.lat) +"&lon=" + (response.coord.lon) + "&appid=" + APIKey;

        console.log(queryURLUV);

        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#uv').text("UV Index: " + response.value);

            //Colors based on UV Index Scale
            if (response.value >= 11 ) {
                $('#uv').addClass("extreme");  
            }

            else if (response.value < 11 && response.value >= 8 ) {
                $('#uv').addClass("very-high");  
            }

            else if (response.value < 8 && response.value >= 6 ) {
                $('#uv').addClass("high");  
            }

            else if (response.value < 6 && response.value >= 3 ) {
                $('#uv').addClass("moderate");  
            }

            else {
                $('#uv').addClass("low");  
            }
         })
        })
    }
}

  //Display 5-Day forecast

  function displayWeeklyForecast() {

    for (i = 0; i < search.length; i++) { 
      var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
      var queryURLF = "http://api.openweathermap.org/data/2.5/forecast?q=" + search[i] +"&appid=" + APIKey;
 
     console.log(queryURLF);
 
        $.ajax({
            url: queryURLF,
            method: "GET"
        }).then(function(response){
            console.log(response);
            //Temp conversions
            var tempFah1 = ((response.list[4].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah2 = ((response.list[12].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah3 = ((response.list[20].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah4 = ((response.list[28].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah5 = ((response.list[36].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);

            //Day 1
            //use moment.js for date
             $('#icon-one').attr("src", "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");
             $('#temp1').text("Temp: " + tempFah1 + " ℉");
             $('#hum1').text("Humidity: " + response.list[4].main.humidity + "%");
            
            //Day 2
            //use moment.js for date
             $('#icon-two').attr("src", "https://openweathermap.org/img/w/" + response.list[12].weather[0].icon + ".png");
             $('#temp2').text("Temp: " + tempFah2 + " ℉");
             $('#hum2').text("Humidity: " + response.list[12].main.humidity + "%");
             
             //Day 3
             //use moment.js for date
             $('#icon-three').attr("src", "https://openweathermap.org/img/w/" + response.list[20].weather[0].icon + ".png");
             $('#temp3').text("Temp: " + tempFah3 + " ℉");
             $('#hum3').text("Humidity: " + response.list[20].main.humidity + "%");
             
             //Day 4
             //use moment.js for date
             $('#icon-four').attr("src", "https://openweathermap.org/img/w/" + response.list[28].weather[0].icon + ".png");
             $('#temp4').text("Temp: " + tempFah4 + " ℉");
             $('#hum4').text("Humidity: " + response.list[28].main.humidity + "%");
             
             //Day 5
             //use moment.js for date
             $('#icon-five').attr("src", "https://openweathermap.org/img/w/" + response.list[36].weather[0].icon + ".png");
             $('#temp5').text("Temp: " + tempFah5 + " ℉");
             $('#hum5').text("Humidity: " + response.list[36].main.humidity + "%");
          }) 
         }
   }
