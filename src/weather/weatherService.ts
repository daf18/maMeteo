import { Geolocation } from '@capacitor/geolocation';
import { ref } from "vue";
import { OneWeather } from "./one-weather.model";

// const apiKey = "c271a5a7e778f307d97e45491f53c283";
const apiKey = "fe47996e7e51e0717e5d3c332f874a37";

export const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=`

const weather = ref<OneWeather>();

export function useWeather(){
    return {
        weather,
        fetchWeather,
        fetchWeatherByCityId,
        formatTemp,
        getWeatherImageUrl
    }
}

async function fetchWeather() {
    const { coords } = await Geolocation.getCurrentPosition();
    const response = await fetch(`${weatherUrl}${apiKey}&lat=${coords.latitude}&lon=${coords.longitude}`);
    weather.value = await response.json()
}

async function fetchWeatherByCityId( cityId: number ) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`);
    weather.value = await response.json()
}

function formatTemp(value: number) {
    return `${Math.round((value - 273.15) * 100)/100} °C`
}

function getWeatherImageUrl(iconName: string){
    return `http://openweathermap.org/img/wn/${iconName}@4x.png`;
}
