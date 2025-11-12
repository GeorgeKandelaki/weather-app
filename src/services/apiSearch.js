import axios from "axios";

// example:
// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
export async function searchPlace(name, count = 10, language = "en", format = "json") {
    const response = await axios(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=${count}&language=${language}&format=${format}`
    );

    const { data } = response;

    return data;
}
