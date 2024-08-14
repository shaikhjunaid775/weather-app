// import React from 'react';
import rainycloudy from '../assets/icons/animated/rainy-3.svg'
import lightcloudy from '../assets/icons/animated/rainy-4.svg'
import moderateRain from '../assets/icons/animated/rainy-1.svg'
import scatteredClouds from '../assets/icons/animated/rainy-2.svg'
import overcastClouds from '../assets/icons/animated/cloudy-day-3.svg'
import day from '../assets/icons/animated/day.svg'

const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.list) {
    console.log('No weather data available');
    return null;
  }



  const temperature = weatherData.list[0].main.temp;
  const description = weatherData.list[0].weather[0].description;
  const city = weatherData.city.name;
  const country = weatherData.city.country;
  const iconCode = weatherData.list[0].weather[0].icon; 
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const getDailyForecast = () => {
    const dailyData = [];
    const dataByDate = {};

    weatherData.list.forEach((item) => {
      const date = new Date(item.dt_txt).toDateString();
      if (!dataByDate[date]) {
        dataByDate[date] = [];
      }
      dataByDate[date].push(item);
    });

    Object.keys(dataByDate).forEach((date) => {
      const items = dataByDate[date];
      const avgTemp = items.reduce((acc, curr) => acc + curr.main.temp, 0) / items.length;
      dailyData.push({
        date,
        temp: avgTemp,
        weather: items[0].weather[0],
      });
    });

    return dailyData.slice(0, 5);
  };

  const getWeatherIcon = (description) =>{
    switch (description.toLowerCase()) {
      case 'clear sky':
        return rainycloudy;
      
      case 'light rain':
        return lightcloudy;
      
      case 'moderate rain':
        return moderateRain;
      
      case 'scattered clouds':
        return scatteredClouds;
      
      case 'overcast clouds':
        return overcastClouds;
    
      default:
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    }
  }

  const dailyForecast = getDailyForecast();


  console.log(city)
  return (
    <div className="w-11/12  bg-white p-4 rounded-xl ring-8 ring-white ring-opacity-40">
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="text-6xl font-bold">{temperature.toFixed()}°C</span>
        <span className="font-semibold mt-1 text-gray-500">
        <h2 className="text-2xl font-bold">{city}, {country}</h2>
        {/* <img src={rainycloudy} alt={description} className="h-24 w-24" /> */}
        </span>
      </div>
     <div className='flex flex-col items-center'>

     <img
            src={getWeatherIcon(description)}
            alt={description}
            className="h-20 w-20"
          />
      <p className='text-gray-400 font-bold'>{description} </p>
     </div>
    </div>

    <div className="flex justify-between mt-12 flex-wrap">
    {dailyForecast.map((day, index) => (
      <div key={index} className="flex flex-col items-center">
        <span className="font-semibold text-sm">{day.date}</span>
        <span className="font-semibold text-lg">{weatherData.list[index].main.temp}°C</span>
        <img
            src={getWeatherIcon(day.weather.description)}
            alt={day.weather.description}
            className="h-12 w-12"
          />
          {description}
       </div>
     ))}
    </div>
  </div> 
  );
};

export default Weather;
