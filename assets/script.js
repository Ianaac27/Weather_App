// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history----------- CHECK
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index--------CHECK
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe----------------------CHECK
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity-----------------CHECK
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city----------------------NOT YET
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast-----------------------------NOT YET
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

var searchButton = $('#buttonSearch');
var citySearch = $('#citySearch');
var search = [];

//Search function
searchButton.click(function createSearch(event) {
    event.preventDefault();
    var submittedSearch = citySearch.submit();
    var userChoice = submittedSearch.val().toLowerCase();

    search.push(userChoice);

    //Adding search to search history
    // var searchedCity = $('<li id=' + citySearch.val() + '>').addClass('searched-city').text(citySearch.val());
    // $('#cityHistory').prepend(searchedCity);

    // localStorage.setItem('searchedCity', searchedCity);

    console.log(search);

    displayCurrentInfo();
    displayUVInfo();
    displayWeeklyForecast();
     displayHistoryInfo()
 });

  function displayHistoryInfo() {

     for (i = 0; i < search.length; i++) { 
       var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
       var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ search[i] +"&appid=" + APIKey;
 
      console.log(queryURL);
 
         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response){
             console.log(response);

             $("#city-one").text(search[0]);
             $("#city-two").text(search[1]);
             $("#city-three").text(search[2]);
             $("#city-four").text(search[3]);
             $("#city-five").text(search[4]);
             $("#city-six").text(search[5]);
             $("#city-seven").text(search[6]);
             $("#city-eight").text(search[7]);
             $("#city-nine").text(search[8]);
             $("#city-ten").text(search[9]);
            
     localStorage.setItem('search1', search[0]);
     localStorage.setItem('search2', search[1]);
     localStorage.setItem('search3', search[2]);
     localStorage.setItem('search4', search[3]);
     localStorage.setItem('search5', search[4]);
     localStorage.setItem('search6', search[5]);
     localStorage.setItem('search7', search[6]);
     localStorage.setItem('search8', search[7]);
     localStorage.setItem('search9', search[8]);
     localStorage.setItem('search10', search[9]);
    
     }) 
 }
 }

 $('.searched-city').click(function searchHistoryFunction(event) {
    event.preventDefault();
    buttonName = $('#' + citySearch.val() + ''.val());
    search.push(buttonName);

    displayCurrentInfo();
    displayUVInfo();
    displayWeeklyForecast();

    console.log(searchHistoryFunction());
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
           
           //Display current date in header
           var currentMoment = moment();
           $("#current-date").text("(" + currentMoment.format('l') + ")");
           
           localStorage.setItem('currentDate', currentMoment.format('l'));

           //Temp conversion
           var tempFah = ((response.main.temp - 273.15) * 9 / 5 + 32).toFixed(1);

           //Display info to page
          $('#current-city').text(response.name); //use moment.js for date
          $('#current-icon').attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
          $('#tempToday').text("Temperature: " + tempFah + " ℉");
          $('#humToday').text("Humidity: " + response.main.humidity + "%");
          $('#wind-speed').text("Wind Speed: " + response.wind.speed + " MPH");

          
         localStorage.setItem('currentCity', response.name);
         localStorage.setItem('currentIcon', "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
         localStorage.setItem('tempToday', "Temperature: " + tempFah + " ℉");
         localStorage.setItem('humToday', "Humidity: " + response.main.humidity + "%");
         localStorage.setItem('wind', "Wind Speed: " + response.wind.speed + " MPH");
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

            localStorage.setItem('UV', "UV Index: " + response.value);
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

            //Set weekly dates
            var currentMoment = moment();

            //Temp conversions
            var tempFah1 = ((response.list[4].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah2 = ((response.list[12].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah3 = ((response.list[20].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah4 = ((response.list[28].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);
            var tempFah5 = ((response.list[36].main.temp - 273.15) * 9 / 5 + 32).toFixed(1);

            //Day 1
             $("#date-one").text(currentMoment.add(1, 'days').format('l'));
             $('#icon-one').attr("src", "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");
             $('#temp1').text("Temp: " + tempFah1 + " ℉");
             $('#hum1').text("Humidity: " + response.list[4].main.humidity + "%");

            localStorage.setItem('date1', currentMoment.add(0, 'days').format('l'));
            localStorage.setItem('icon1', "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");
            localStorage.setItem('temp1', "Temp: " + tempFah1 + " ℉");
            localStorage.setItem('hum1', "Humidity: " + response.list[4].main.humidity + "%");
            
            //Day 2
             $("#date-two").text(currentMoment.add(1, 'days').format('l'));
             $('#icon-two').attr("src", "https://openweathermap.org/img/w/" + response.list[12].weather[0].icon + ".png");
             $('#temp2').text("Temp: " + tempFah2 + " ℉");
             $('#hum2').text("Humidity: " + response.list[12].main.humidity + "%");

            localStorage.setItem('date2', currentMoment.add(0, 'days').format('l'));
            localStorage.setItem('icon2', "https://openweathermap.org/img/w/" + response.list[12].weather[0].icon + ".png");
            localStorage.setItem('temp2', "Temp: " + tempFah2 + " ℉");
            localStorage.setItem('hum2', "Humidity: " + response.list[12].main.humidity + "%");
             
             //Day 3
             $("#date-three").text(currentMoment.add(1, 'days').format('l'));
             $('#icon-three').attr("src", "https://openweathermap.org/img/w/" + response.list[20].weather[0].icon + ".png");
             $('#temp3').text("Temp: " + tempFah3 + " ℉");
             $('#hum3').text("Humidity: " + response.list[20].main.humidity + "%");

            localStorage.setItem('date3', currentMoment.add(0, 'days').format('l'));
            localStorage.setItem('icon3', "https://openweathermap.org/img/w/" + response.list[20].weather[0].icon + ".png");
            localStorage.setItem('temp3', "Temp: " + tempFah3 + " ℉");
            localStorage.setItem('hum3', "Humidity: " + response.list[20].main.humidity + "%");
             
             //Day 4
             $("#date-four").text(currentMoment.add(1, 'days').format('l'));
             $('#icon-four').attr("src", "https://openweathermap.org/img/w/" + response.list[28].weather[0].icon + ".png");
             $('#temp4').text("Temp: " + tempFah4 + " ℉");
             $('#hum4').text("Humidity: " + response.list[28].main.humidity + "%");

            localStorage.setItem('date4', currentMoment.add(0, 'days').format('l'));
            localStorage.setItem('icon4', "https://openweathermap.org/img/w/" + response.list[28].weather[0].icon + ".png");
            localStorage.setItem('temp4', "Temp: " + tempFah4 + " ℉");
            localStorage.setItem('hum4', "Humidity: " + response.list[28].main.humidity + "%");
             
             //Day 5
             $("#date-five").text(currentMoment.add(1, 'days').format('l'));
             $('#icon-five').attr("src", "https://openweathermap.org/img/w/" + response.list[36].weather[0].icon + ".png");
             $('#temp5').text("Temp: " + tempFah5 + " ℉");
             $('#hum5').text("Humidity: " + response.list[36].main.humidity + "%");

            localStorage.setItem('date5', currentMoment.add(0, 'days').format('l'));
            localStorage.setItem('icon5', "https://openweathermap.org/img/w/" + response.list[36].weather[0].icon + ".png");
            localStorage.setItem('temp5', "Temp: " + tempFah5 + " ℉");
            localStorage.setItem('hum5', "Humidity: " + response.list[36].main.humidity + "%");
          }) 
         }
   }

//Get Local Storage
   window.onload = function() {
    
    //Search History
    var getSearch1 = localStorage.setItem('search1');
    $("#city-one").text(getSearch1);
    var getSearch2 =localStorage.setItem('search2');
    $("#city-two").text(getSearch2);
    var getSearch3 =localStorage.setItem('search3');
    $("#city-three").text(getSearch3);
    var getSearch4 =localStorage.setItem('search4');
    $("#city-four").text(getSearch4);
    var getSearch5 =localStorage.setItem('search5');
    $("#city-five").text(getSearch5);
    var getSearch6 =localStorage.setItem('search6');
    $("#city-six").text(getSearch6);
    var getSearch7 =localStorage.setItem('search7');
    $("#city-seven").text(getSearch7);
    var getSearch8 =localStorage.setItem('search8');
    $("#city-eight").text(getSearch8);
    var getSearch9 =localStorage.setItem('search9');
    $("#city-nine").text(getSearch9);
    var getSearch10 =localStorage.setItem('search10');
    $("#city-ten").text(getSearch10);

    //Get current info
    var getCity = localStorage.getItem('currentCity');
    $('#current-city').text(getCity);
    var getDate = localStorage.getItem('currentDate');
    $("#current-date").text(getDate);
    var getIcon = localStorage.getItem('currentIcon');
    $('#current-icon').attr("src", getIcon);
    var getTemp = localStorage.getItem('tempToday');
    $('#tempToday').text(getTemp);
    var getHum = localStorage.getItem('humToday');
    $('#humToday').text(getHum);
    var getWind = localStorage.getItem('wind');
    $('#wind-speed').text(getWind);
    var getUV = localStorage.getItem('UV');
    $('#uv').text(getUV);
    
    //Colors based on UV Index Scale
    if ( getUV >= 11 ) {
        $('#uv').addClass("extreme");  
    }
    else if ( getUV < 11 && getUV >= 8 ) {
        $('#uv').addClass("very-high");  
    }
    else if ( getUV < 8 && getUV >= 6 ) {
        $('#uv').addClass("high");  
    }
    else if ( getUV < 6 && getUV >= 3 ) {
        $('#uv').addClass("moderate");  
    }
    else {
        $('#uv').addClass("low");  
    }

    //Get Forecast
    //Day 1
    var getDate1 = localStorage.getItem('date1');
    $("#date-one").text(getDate1);
    var getIcon1 = localStorage.getItem('icon1');
    $('#icon-one').attr("src", getIcon1);
    var getTemp1 = localStorage.getItem('temp1');
    $('#temp1').text(getTemp1);
    var getHum1 = localStorage.getItem('hum1');
    $('#hum1').text(getHum1);

    //Day 2
    var getDate2 = localStorage.getItem('date2');
    $("#date-two").text(getDate2);
    var getIcon2 = localStorage.getItem('icon2');
    $('#icon-two').attr("src", getIcon2);
    var getTemp2 = localStorage.getItem('temp2');
    $('#temp2').text(getTemp2);
    var getHum2 = localStorage.getItem('hum2');
    $('#hum2').text(getHum2);

    //Day 3
    var getDate3 = localStorage.getItem('date3');
    $("#date-three").text(getDate3);
    var getIcon3 = localStorage.getItem('icon3');
    $('#icon-three').attr("src", getIcon3);
    var getTemp3 = localStorage.getItem('temp3');
    $('#temp3').text(getTemp3);
    var getHum3 = localStorage.getItem('hum3');
    $('#hum3').text(getHum3);

    //Day 4
    var getDate4 = localStorage.getItem('date4');
    $("#date-four").text(getDate4);
    var getIcon4 = localStorage.getItem('icon4');
    $('#icon-four').attr("src", getIcon4);
    var getTemp4 = localStorage.getItem('temp4');
    $('#temp4').text(getTemp4);
    var getHum4 = localStorage.getItem('hum4');
    $('#hum4').text(getHum4);

    //Day 5
    var getDate5 = localStorage.getItem('date5');
    $("#date-five").text(getDate5);
    var getIcon5 = localStorage.getItem('icon5');
    $('#icon-five').attr("src", getIcon5);
    var getTemp5 = localStorage.getItem('temp5');
    $('#temp5').text(getTemp5);
    var getHum5 = localStorage.getItem('hum5');
    $('#hum5').text(getHum5);
}