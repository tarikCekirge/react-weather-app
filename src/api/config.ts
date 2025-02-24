export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO: "http://api.openweathermap.org/geo/1.0",
  API_KEY: import.meta.env.API_KEY,
  DEFAULTS_PARAMS: {
    units: "metric",
    appid: import.meta.env.API_KEY,
  },
};
