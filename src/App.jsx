import { useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./component/Weather";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");

  const API_KEY = "6dc01765ab87e4061df83e55b1c8ff40";

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;


  const searchLocation = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data:", error);
        });
    }
  };

  return (
    <div className="h-screen  text-gray-700 p-4 bg-gradient-to-br  from-pink-200 via-purple-200 to-indigo-200">
      <div className="flex flex-col items-center justify-between  gap-8">
        <div className="w-11/12 ring-8 ring-white ring-opacity-40 rounded-lg">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={searchLocation}
            />
            <button
              type="button"
              onClick={searchLocation}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>
        <Weather weatherData={data} />
      </div>
    </div>
  );
}

export default App;
