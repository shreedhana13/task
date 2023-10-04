document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.row');

  
    function createCard(country) {
        const card = document.createElement('div');
        card.classList.add('col-lg-4', 'col-sm-12');
        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5>${country.name}</h5>
                </div>
                <div class="card-body">
                    <img src="${country.flag}" class="img-fluid mb-3" alt="Flag">
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Latitude:</strong> ${country.latlng[0]}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Country Codes:</strong> ${country.alpha2Code}, ${country.alpha3Code}</p>
                    <button class="btn btn-primary" data-country="${country.alpha2Code}">Click for Weather</button>
                </div>
            </div>
        `;
        container.appendChild(card);

       
        const weatherButton = card.querySelector('.btn');
        weatherButton.addEventListener('click', () => {
            getWeatherData(country.alpha2Code);
        });
    }

  
    function getCountriesData() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    createCard(country);
                });
            })
            .catch(error => console.error('Error fetching countries data:', error));
    }

   
    function getWeatherData(countryCode) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=YOUR_API_KEY&units=metric`)
            .then(response => response.json())
            .then(data => {
                alert(`Weather in ${data.name} (${data.sys.country}):
                Temperature: ${data.main.temp}°C
                Weather: ${data.weather[0].description}`);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    
    getCountriesData();
});
