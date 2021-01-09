const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon > img');

//CALLING THE CONSTRUCTOR CLASS FOR INFORMATION FROM FORECAST.JS
const weather = new WeatherInformation();


//local storage function
const storingData = (location) => {
    localStorage.setItem('weatherData', location);
}



// FUNTION THAT IS UPDATING THE UI
const updateUI = (data) => {
    const {cityDet, weatherDet} = data; 

    if(weatherDet.IsDayTime){
        time.setAttribute('src', 'images/day-time.jpg');
        storingData(cityDet.EnglishName);

        details.innerHTML = 
        `<h5>${cityDet.EnglishName}</h5>
        <div>Day Time, ${weatherDet.WeatherText}</div>
        <p>
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </p>`;
    }
    else {
        time.setAttribute('src', 'images/night-time.jpg');
        storingData(cityDet.EnglishName);

        details.innerHTML = 
        `<h5>${cityDet.EnglishName}</h5>
        <div>Night Time, ${weatherDet.WeatherText}</div>
        <p>
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </p>`
    }
    icon.setAttribute('src', `icons/${weatherDet.WeatherIcon}.svg`)

    //checking if card has a d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}



//UPDATING OR ADDING THE WEATHER INFO TO CARD WHEN THE INPUT IS SUBMITTED
form.addEventListener('submit', (e) => {
    //prevent default location
    e.preventDefault();
    
    //get city value
    const city = form.city.value.trim();
    form.reset();

    //update the UI with new city
    weather.weatherInfo(city)
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            details.innerHTML = err;
            card.classList.remove('d-none');
        });
})

//ADDING THE WEATHER INFORMATION FROM THE LOCATION THAT HAS ALREADY STORED INTO THE LOCAL STORAGE
document.addEventListener('DOMContentLoaded', () => {
    const city = localStorage.getItem('weatherData');
    weather.weatherInfo(city).then((data) => {
        updateUI(data);
    })
})


