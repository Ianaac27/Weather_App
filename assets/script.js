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
var submittedSearch = "";

searchButton.click(function(event) {
    event.preventDefault();
    var desiredCity = citySearch.submit();

    submittedSearch.concat(desiredCity.val());

    $('#cityHistory').text(citySearch.val());

    
});

console.log(submittedSearch);

// var search = submittedSearch.val().toLowerCase();

//     var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ search +"&appid=" + APIKey;

    // console.log(search);

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    //     findUVIndex(response.city.coord.lat, response.city.coord.lon, response);
    // })  