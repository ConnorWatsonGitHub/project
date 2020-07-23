// Application ID: 0a3bdae3
// Application Key: 24f675edf002ea1e74ef3ec002d31fc5



//part of the navigator API. will save the current position (lat and long)
function getWeather(position) {
    try {
    //saving the latitude and longitude
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //Instatiate new XMLHttpRequest object 
    const Http = new XMLHttpRequest();
    //URL to weatherunlockedapi
    let url = "https://cors-anywhere.herokuapp.com/http://api.weatherunlocked.com/api/current/" + latitude + "," + longitude + "?app_id=0a3bdae3&app_key=24f675edf002ea1e74ef3ec002d31fc5";
    Http.open("GET", url);
    //send Http request
    Http.send();
    //when the request is rechieved work with the responseText
    Http.onload = (e) => {
            //saving the text form the response as a JSON object
            let weatherInfo = JSON.parse(Http.responseText);
            //saving the DOM objects of the label for temp and the img for the weather gif
            let label = document.getElementById("weatherLabel");
            let img = document.getElementById("weatherImg");
            //setting the information in the label and the img. using the 'feels like' temp because thats the most important temperature 
            //removing the decimal and any numbers past the decimal point in the temperature
            label.textContent = "Current Weather: " + weatherInfo.feelslike_c + "\u00B0C";
            //setting the location, alt text, and title (to allow hover text) for the img
            img.setAttribute("src", "weatherIcons/" + weatherInfo.wx_icon);
            img.setAttribute("alt", weatherInfo.wx_desc);
            img.setAttribute("title", weatherInfo.wx_desc);
        };
    }
    catch (e) {
        //calls the error function and passes the exception 

        error(e);
    }
}

//will display this if there is an error while getting current position or getting the weather data
function error(e) {
    //getting the weatherLabel DOM object and changing the class to 'error' and the text content to display the error
    let errorMsg = document.getElementById("weatherLabel");
    errorMsg.className = "error";
    errorMsg.textContent = "An Error Occured While Getting Weather: " + e.message;
}



//Making sure the page has loaded before displaying the weather
let header = document.querySelector("header");
header.addEventListener("load", navigator.geolocation.getCurrentPosition(getWeather, error));



