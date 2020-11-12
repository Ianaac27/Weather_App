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

    displayCurrent();
 });


  function displayCurrent() {

   for (i = 0; i < search.length; i++) { 
     var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ search[i] +"&appid=" + APIKey;

    console.log(queryURL);

       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response){
           console.log(response);
           $('#current-city').text(response.city.name); //use moment.js for date
           $('#tempToday').text(response.list[0].main.temp);
           $('#humToday').text(response.list[0].main.humidity);
           $('#wind-speed').text(response.list[0].wind.speed);
           $('#uv').text(response.city.name);
         }) 

        }
  }