import axios from "axios";
import { ACCUWEATHER_API_KEY } from "./env";
import { Forecast, Location } from "./types";

const BASE_URL = "https://dataservice.accuweather.com";
const LOCATIONS_ENDPOINT = `${BASE_URL}/locations/v1/cities/search`;
const CURRENT_CONDITIONS_ENDPOINT = `${BASE_URL}/currentconditions/v1`;

// Given a city name, return the location object which contains the location key
export async function getLocation(city: string): Promise<Location> {
  try {
    const response = await axios.get(LOCATIONS_ENDPOINT, {
      params: {
        apikey: ACCUWEATHER_API_KEY,
        q: city,
      },
    });
    const location: Location = response.data[0];
    return location;
  } catch (err) {
    // re-throw the error for now
    throw err;
  }
}

// Given a location key, return the current weather conditions
export async function getCurrentCondition(
  locationKey: string
): Promise<Forecast> {
  try {
    const response = await axios.get(
      `${CURRENT_CONDITIONS_ENDPOINT}/${locationKey}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
        },
      }
    );
    const forecast: Forecast = response.data[0];
    return forecast;
  } catch (err) {
    // re-throw the error for now
    throw err;
  }
}

/* Example */

// const city = "Baltimore";

// async function getWeather() {
//   try {
//     const location = await getLocation(city);
//     const forecast = await getCurrentCondition(location.Key);
//     console.log(forecast);
//   } catch (err) {
//     console.error(err);
//   }
// }

// getWeather();
