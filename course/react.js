function WeatherWidget() {
    const [weatherData, setWeatherData] = React.useState(null);
    const [city, setCity] = React.useState('');
    const [error, setError] = React.useState(false);
    const [selectedDay, setSelectedDay] = React.useState('today');
  
    const fetchData = async () => {
      const apiKey = '309abe9c9cac39d8a74cd3783dc3f219';
  
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
  
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Помилка отримання даних:', error);
        setError(true);
      }
    };
  
    const handleGetWeather = () => {
      fetchData();
    };
  
    const handleDayToggle = (day) => {
      setSelectedDay(day);
    };
  
    if (!weatherData) {
      return (
        <div>
          <h1 className="page_name">Сторінка з погодою</h1>
          <div className="input-button">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введіть назву міста"
              className="input_field"
            />
            <button className="button" onClick={handleGetWeather}>
              Дізнатися погоду
            </button>
            {error ? <div>Місце не знайдено '^'</div> : <div></div>}
          </div>
        </div>
      );
    }
  
    const todayData = weatherData.list.filter((item) => {
      const date = new Date(item.dt_txt);
      const today = new Date();
  
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
  
    const tomorrowData = weatherData.list.filter((item) => {
      const date = new Date(item.dt_txt);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
  
      return (
        date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear()
      );
    });
  
    let selectedData = todayData;
    if (selectedDay === 'tomorrow') {
      selectedData = tomorrowData;
    }
  
    let selectedWeatherImage = '';
    if (selectedData.length > 0) {
      if (selectedData[0].weather[0].main === 'Clear') {
        selectedWeatherImage =
          'https://cdn.pixabay.com/photo/2022/03/28/22/48/sun-7098480_960_720.png';
      } else if (selectedData[0].weather[0].main === 'Clouds') {
        selectedWeatherImage =
          'https://cdn.pixabay.com/photo/2022/03/28/22/48/cloudy-7098479_1280.png';
      } else if (selectedData[0].weather[0].main === 'Rain') {
        selectedWeatherImage =
          'https://t4.ftcdn.net/jpg/03/38/74/43/360_F_338744374_c8v4RyKnToRWqPA4SalFf8ktaMQA48QW.jpg';
      } else if (selectedData[0].weather[0].main === 'Snow') {
        selectedWeatherImage =
          'https://static.vecteezy.com/system/resources/previews/010/425/906/original/scattered-snow-color-icon-snowy-light-snow-partly-cloudy-winter-weather-cloud-snowflake-and-sun-weather-forecast-isolated-illustration-vector.jpg';
      } else if (selectedData[0].weather[0].main === 'Haze') {
        selectedWeatherImage =
          'https://i.pinimg.com/564x/1e/c4/e8/1ec4e83f5d60afc434ac5dc8a9efcdf4.jpg';
      }
    }
  
    return (
      <div>
        <h1 className="page_name">Сторінка з погодою</h1>
        <div className="input-button">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введіть назву міста"
            className="input_field"
          />
          <button className="button" onClick={handleGetWeather}>
            Get Weather
          </button>
          {error ? <div className ='error'>Місце не знайдено '^'. Спробуйте щось інше ^-^</div> : <div></div>}
        </div>
  
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${selectedDay === 'today' ? 'active' : ''}`}
            onClick={() => handleDayToggle('today')}
          >
            Сьогодні
          </button>
          <button
            className={`toggle-button ${
              selectedDay === 'tomorrow' ? 'active' : ''
            }`}
            onClick={() => handleDayToggle('tomorrow')}
          >
            Завтра
          </button>
        </div>
  
        <div className="container">
          <div className="box1">
            <img src={selectedWeatherImage} alt="Weather" />
          </div>
          <div className="box2">
            <h1>{selectedDay === 'today' ? 'Сьогодні' : 'Завтра (12.00)'}</h1>
            {selectedData.length > 0 && (
              <div>
                <p>Поточне місце: {weatherData.city.name}</p>
                <p>Опис: {selectedData[0].weather[0].description}</p>
                <p>Температура: {parseInt(selectedData[0].main.temp - 273.15)}°C</p>
                <p>Вологість: {selectedData[0].main.humidity}%</p>
                <p>Вітер: {selectedData[0].wind.speed}км/год</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<WeatherWidget />, document.getElementById('root'));