const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '309abe9c9cac39d8a74cd3783dc3f219';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn.pixabay.com/photo/2022/03/28/22/48/sun-7098480_960_720.png';
                    break;

                case 'Rain':
                    image.src = 'https://t4.ftcdn.net/jpg/03/38/74/43/360_F_338744374_c8v4RyKnToRWqPA4SalFf8ktaMQA48QW.jpg';
                    break;

                case 'Snow':
                    image.src = 'https://static.vecteezy.com/system/resources/previews/010/425/906/original/scattered-snow-color-icon-snowy-light-snow-partly-cloudy-winter-weather-cloud-snowflake-and-sun-weather-forecast-isolated-illustration-vector.jpg';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn.pixabay.com/photo/2022/03/28/22/48/cloudy-7098479_1280.png';
                    break;

                case 'Haze':
                    image.src = 'https://i.pinimg.com/564x/1e/c4/e8/1ec4e83f5d60afc434ac5dc8a9efcdf4.jpg';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}км/год`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('changed');
            weatherDetails.classList.add('changed');
            container.style.height = '590px';
        });

});