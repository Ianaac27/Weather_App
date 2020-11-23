//=================================================Search button functions====================================================
var searchButton = $('#buttonSearch');
var citySearch = $('#citySearch');

//Search function
searchButton.click(function createSearch(event) {
    event.preventDefault();
    var search = [];
    var submittedSearch = citySearch.submit();
    var userChoice = submittedSearch.val().toLowerCase();
    search.push(userChoice);
    console.log(search);

    for (i = 0; i < search.length; i++) { 
        var city = search[i]
        localStorage.setItem('cityName', city);
        console.log(city);

    displayCurrentInfo();
    displayUVInfo();
    displayWeeklyForecast();
    }

//Adding search to search history
var searchedCity = $('<button>').addClass('searched-city').attr('data-city', citySearch.val()).text(citySearch.val().toUpperCase()); 
    $('#cityHistory').prepend(searchedCity);

//Search history buttons
    $('.searched-city').click(function () {
        var city = $(this).data('city').toLowerCase();
        localStorage.setItem('historyName', city);
        console.log(city);

    currentInfoHistory();
    UVInfoHistory();
    weeklyForecastHistory();
  });

});

//Display current information based on search
  function displayCurrentInfo() {

    var city = localStorage.getItem('cityName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

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

        }) 
    }

//Display UV Index
function displayUVInfo() {

    var city = localStorage.getItem('cityName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + (response.coord.lat) +"&lon=" + (response.coord.lon) + "&appid=" + APIKey;

    console.log(queryURLUV);

    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $('#uv').text("UV Index: " + response.value);

        //Colors based on UV Index Scale
        if (response.value > 7) {
            $('#uv').addClass('bg-danger text-white rounded')
        }
        else if (response.value > 3 && response.value <= 7) {
            $('#uv').addClass('bg-warning text-white rounded')
        }
        else if (response.value <= 3) {
            $('#uv').addClass('bg-success text-white rounded')
        }

        })
    })
}

//Display 5-Day forecast
function displayWeeklyForecast() {

    var city = localStorage.getItem('cityName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURLF = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + APIKey;

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
    
    //Day 2
    $("#date-two").text(currentMoment.add(1, 'days').format('l'));
    $('#icon-two').attr("src", "https://openweathermap.org/img/w/" + response.list[12].weather[0].icon + ".png");
    $('#temp2').text("Temp: " + tempFah2 + " ℉");
    $('#hum2').text("Humidity: " + response.list[12].main.humidity + "%");
        
    //Day 3
    $("#date-three").text(currentMoment.add(1, 'days').format('l'));
    $('#icon-three').attr("src", "https://openweathermap.org/img/w/" + response.list[20].weather[0].icon + ".png");
    $('#temp3').text("Temp: " + tempFah3 + " ℉");
    $('#hum3').text("Humidity: " + response.list[20].main.humidity + "%");
        
    //Day 4
    $("#date-four").text(currentMoment.add(1, 'days').format('l'));
    $('#icon-four').attr("src", "https://openweathermap.org/img/w/" + response.list[28].weather[0].icon + ".png");
    $('#temp4').text("Temp: " + tempFah4 + " ℉");
    $('#hum4').text("Humidity: " + response.list[28].main.humidity + "%");
        
    //Day 5
    $("#date-five").text(currentMoment.add(1, 'days').format('l'));
    $('#icon-five').attr("src", "https://openweathermap.org/img/w/" + response.list[36].weather[0].icon + ".png");
    $('#temp5').text("Temp: " + tempFah5 + " ℉");
    $('#hum5').text("Humidity: " + response.list[36].main.humidity + "%");
    }) 
    }

//=================================================Search history button functions====================================================

//Display current information
function currentInfoHistory() {

    var city = localStorage.getItem('historyName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

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
        $('#current-city').text(response.name); 
        $('#current-icon').attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $('#tempToday').text("Temperature: " + tempFah + " ℉");
        $('#humToday').text("Humidity: " + response.main.humidity + "%");
        $('#wind-speed').text("Wind Speed: " + response.wind.speed + " MPH");
        }) 
    }

//Display UV Index based
function UVInfoHistory() {

    var city = localStorage.getItem('historyName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + (response.coord.lat) +"&lon=" + (response.coord.lon) + "&appid=" + APIKey;

        console.log(queryURLUV);

        $.ajax({
            url: queryURLUV,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#uv').text("UV Index: " + response.value);

            //Colors based on UV Index Scale
            if (response.value > 7) {
                $('#uv').addClass('bg-danger text-white p-1 rounded')
            }
            else if (response.value > 3 && response.value <= 7) {
                $('#uv').addClass('bg-warning text-white p-1 rounded')
            }
            else if (response.value <= 3) {
                $('#uv').addClass('bg-success text-white p-1 rounded')
            }
            })
        })
    }

//Display 5-Day forecast
function weeklyForecastHistory() {

    var city = localStorage.getItem('historyName');
    var APIKey = "d5866c2d5c0e76c2380895bf8574fe70";
    var queryURLF = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + APIKey;

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
    
    //Day 2
        $("#date-two").text(currentMoment.add(1, 'days').format('l'));
        $('#icon-two').attr("src", "https://openweathermap.org/img/w/" + response.list[12].weather[0].icon + ".png");
        $('#temp2').text("Temp: " + tempFah2 + " ℉");
        $('#hum2').text("Humidity: " + response.list[12].main.humidity + "%");
            
    //Day 3
        $("#date-three").text(currentMoment.add(1, 'days').format('l'));
        $('#icon-three').attr("src", "https://openweathermap.org/img/w/" + response.list[20].weather[0].icon + ".png");
        $('#temp3').text("Temp: " + tempFah3 + " ℉");
        $('#hum3').text("Humidity: " + response.list[20].main.humidity + "%");
        
    //Day 4
        $("#date-four").text(currentMoment.add(1, 'days').format('l'));
        $('#icon-four').attr("src", "https://openweathermap.org/img/w/" + response.list[28].weather[0].icon + ".png");
        $('#temp4').text("Temp: " + tempFah4 + " ℉");
        $('#hum4').text("Humidity: " + response.list[28].main.humidity + "%");
        
    //Day 5
        $("#date-five").text(currentMoment.add(1, 'days').format('l'));
        $('#icon-five').attr("src", "https://openweathermap.org/img/w/" + response.list[36].weather[0].icon + ".png");
        $('#temp5').text("Temp: " + tempFah5 + " ℉");
        $('#hum5').text("Humidity: " + response.list[36].main.humidity + "%");
        }) 
    }

//===================================================Display Last City===========================================================

//Get Local Storage
   window.onload = function() {

//Get most recent search history button
   var cityName = localStorage.getItem('cityName');
   var searchedCity = $('<button>').addClass('searched-city').attr('data-city', cityName).text(cityName.toUpperCase()); 
   $('#cityHistory').prepend(searchedCity);

    displayCurrentInfo();
    displayUVInfo();
    displayWeeklyForecast();
}