import axios from "axios";
import { URL } from "../constants";

// Example Open-Meteo API URL:
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch

class APIWeather {
    // -------------------------
    // Constructor & Defaults
    // -------------------------
    constructor(
        lat,
        lng,
        units = {
            wind_speed_unit: "kmh",
            temperature_unit: "celsius",
            precipitation_unit: "mm",
        },
        timezone = "auto"
    ) {
        this.lat = lat;
        this.lng = lng;
        this.units = units;
        this.timezone = timezone;

        // Build initial URL
        this.#buildUrl();
    }

    #buildUrl() {
        // Automatically rebuild the URL whenever coordinates/units change
        this.url = `${URL}?latitude=${this.lat}&longitude=${this.lng}&timezone=${this.timezone}&${Object.entries(
            this.units
        )
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`;
    }

    async #fetch(endpoint, fields) {
        try {
            const { data } = await axios.get(`${this.url}&${endpoint}=${fields}`);
            return data;
        } catch (err) {
            console.error(`Weather API fetch error [${endpoint}]:`, err.message);
            return null;
        }
    }

    getCurrentWeather(fields = "weather_code,temperature_2m,wind_speed_10m") {
        return this.#fetch("current", fields);
    }

    getDailyWeather(fields = "weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m") {
        return this.#fetch("daily", fields);
    }

    getHourlyWeather(fields = "weather_code,temperature_2m,wind_speed_10m") {
        return this.#fetch("hourly", fields);
    }

    setCoordinates(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.#buildUrl(); // automatically rebuild URL
        return this; // allow chaining
    }

    setUnits(units) {
        this.units = units;
        this.#buildUrl(); // automatically rebuild URL
        return this; // allow chaining
    }

    setTimezone(timezone) {
        this.timezone = timezone;
        this.#buildUrl(); // automatically rebuild URL
        return this; // allow chaining
    }
}

export default APIWeather;
