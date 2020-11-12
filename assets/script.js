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

    $('#cityHistory').text(citySearch.val()); //make a button, display local storage

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
            $('#current-city').text(response.name); //use moment.js for date
            // $('#icon').text(response.weather.icon);  Find a way to display icon
            $('#tempToday').text("Temperature: " + response.main.temp);
            $('#humToday').text("Humidity: " + response.main.humidity);
            $('#wind-speed').text("Wind Speed: " + response.wind.speed);
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
            //Day 1
            //use moment.js for date
             // $('#icon').text(response.weather.icon);  Find a way to display icon
             $('#temp1').text("Temp: " + response.list[4].main.temp);
             $('#hum1').text("Humidity: " + response.list[4].main.humidity);
            
            //Day 2
            //use moment.js for date
             // $('#icon').text(response.weather.icon);  Find a way to display icon
             $('#temp2').text("Temp: " + response.list[12].main.temp);
             $('#hum2').text("Humidity: " + response.list[12].main.humidity);
             
             //Day 3
             //use moment.js for date
             // $('#icon').text(response.weather.icon);  Find a way to display icon
             $('#temp3').text("Temp: " + response.list[20].main.temp);
             $('#hum3').text("Humidity: " + response.list[20].main.humidity);
             
             //Day 4
             //use moment.js for date
             // $('#icon').text(response.weather.icon);  Find a way to display icon
             $('#temp4').text("Temp: " + response.list[28].main.temp);
             $('#hum4').text("Humidity: " + response.list[28].main.humidity);
             
             //Day 5
             //use moment.js for date
             // $('#icon').text(response.weather.icon);  Find a way to display icon
             $('#temp5').text("Temp: " + response.list[36].main.temp);
             $('#hum5').text("Humidity: " + response.list[36].main.humidity);
          }) 
         }
   }