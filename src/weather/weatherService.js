import { AnyPlugin } from "any-plugin";

export const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=c271a5a7e778f307d97e45491f53c283`

let weather = {};

async function fetchWeather() {
    const { coords } = await AnyPlugin.Geolocation.getCurrentPosition();
    const response = await fetch(`${weatherUrl}lat=${coords.latitude}&lon=${coords.longitude}`);
    weather = await response.json()
}

export function useWeather(){
    return {
        weather,
        fetchWeather,
    }
}