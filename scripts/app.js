const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon > img');

//local storage function
const storingData = (location) => {
    localStorage.setItem('weatherData', location);
}

const updateUI = (data) => {
    const {cityDet, weatherDet} = data;
    console.log(data);
 

    if(weatherDet.IsDayTime){
        time.setAttribute('src', 'images/day-time.jpg');
        if(localStorage.getItem('weatherData')){
            localStorage.clear();
            storingData(cityDet.EnglishName);
        }else {
            storingData(cityDet.EnglishName);
        }
        details.innerHTML = 
        `<h5>${cityDet.EnglishName}</h5>
        <div>Day Time, ${weatherDet.WeatherText}</div>
        <p>
            <span>${weatherDet.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </p>`;
    }else {
        time.setAttribute('src', 'images/night-time.jpg');
        if(localStorage.getItem('weatherData')){
            localStorage.clear();
            storingData(cityDet.EnglishName);
        }else {
            storingData(cityDet.EnglishName);
        }
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

const weatherInfo = async (city) => {
    const cityDet = await getCity(city);
    const weatherDet = await getWeather(cityDet.Key);
    return { cityDet, weatherDet}
}

cityForm.addEventListener('submit', (e) => {
    //prevent default location
    e.preventDefault();
    
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new city
    weatherInfo(city)
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            details.innerHTML = err;
            card.classList.remove('d-none');
        });
})

document.addEventListener('DOMContentLoaded', () => {
    const city = localStorage.getItem('weatherData');
    weatherInfo(city).then((data) => {
        updateUI(data);
    })
})


