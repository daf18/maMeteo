<template>
  <ion-card v-if="weather && ville" class="ion-text-center">
    <ion-card-header>
      <ion-card-title class="title">
        {{ ville }}
      </ion-card-title>
      <ion-card-title>
        {{ formatTemp(weather.main.temp) }}
      </ion-card-title>
    </ion-card-header>
    <div class="weather-background">
      <img :src="getWeatherImageUrl(weather.weather[0].icon)" />
    </div>
    <ion-card-title>
      {{ weather.weather[0].description }}
    </ion-card-title>
  </ion-card>
</template>

<script lang="ts">
import { useWeather } from "./weatherService";
import { defineComponent, onMounted, toRefs } from "vue";
import { IonCard, IonCardTitle, IonCardHeader } from "@ionic/vue";

export default defineComponent({
  components: {
    IonCard,
    IonCardTitle,
    IonCardHeader,
  },
  props: {
    ville: String,
  },
  setup(props) {
    const {
      weather,
      fetchWeather,
      formatTemp,
      fetchWeatherByCityId,
      getWeatherImageUrl,
    } = useWeather();

    const { ville } = toRefs(props);
    
    if (ville.value?.toString() === "Position actuelle") {
      onMounted(fetchWeather);
    }else{
        // TODO: fetch Weather by city id filter cities' id from city.json
    //TODO:    onMounted(fetchWeatherByCityId(6077243));
    }

    return { weather, formatTemp, getWeatherImageUrl };
  },
});
</script>

<style>
ion-card {
  --background: transparent;
  --color: primary-contrast;
}
.title {
  font-size: large;
  font-weight: 900;
  text-align: center;
}
</style>
