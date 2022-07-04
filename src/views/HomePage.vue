<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Ma météo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding class="background" :fullscreen="true">
      <ion-item class="ion-text-center">
        <ion-label color="primary-contrast">{{ mydate }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Ville: </ion-label>
        <ion-select
          placeholder="Choisir"
          v-model="chosenCity"
          @ion-change="loadFetch(chosenCity)"
        >
          <ion-select-option value="montreal">Montréal</ion-select-option>
          <ion-select-option value="laval">Laval</ion-select-option>
          <ion-select-option value="quebec">Québec</ion-select-option>
          <ion-select-option value="Position actuelle"
            >Position actuelle</ion-select-option
          >
        </ion-select>
      </ion-item>
      <p class="ion-text-center title">{{ name }}</p>
      <p class="ion-text-center title">{{ temp }} °C</p>
      <img :src="`assets/${icon}.svg`" class="center" />
      <p class="ion-text-center elt">{{ description }}</p>
      <!-- <ion-select placeholder="Choisir" v-model="villeChoisie">
          <ion-select-option value="Montréal">Montréal</ion-select-option>
          <ion-select-option value="Laval">Laval</ion-select-option>
          <ion-select-option value="Québec">Québec</ion-select-option>
          <ion-select-option value="Position actuelle"
            >Position actuelle</ion-select-option
          >
        </ion-select> 
      </ion-item>-->
      <!-- <div :key="chosenCity">
        <current-weather :ville="chosenCity"></current-weather>
      </div> -->
    </ion-content>
    <ion-footer>
      <ion-toolbar color="secondary">
        <ion-title>@ Andreea&Yanan</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
const APIKEY = "fe47996e7e51e0717e5d3c332f874a37";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { loadingController } from "@ionic/vue";
import { defineComponent } from "vue";
import moment from "moment";
import { Geolocation } from '@capacitor/geolocation';
// import CurrentWeather from "@/weather/current-weather.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    // CurrentWeather
  },
  data() {
    return {
      chosenCity: "montreal",
      name: "",
      position: "",
      temp: "",
      icon: "",
      description: "",
      mydate: "",
    };
  },
  ionViewDidEnter() {
    this.loadFetch(this.chosenCity);
  },
  methods: {
    async loadFetch(city: string) {
      const loading = await loadingController.create({
        message: "Attendez SVP...",
      });
      await loading.present();

      var url = "";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`

      if (city !== "Position actuelle") {
        url = `${weatherUrl}q=${city}&appid=${APIKEY}&lang=fr&units=metric`;
      } else {
        const { coords } = await Geolocation.getCurrentPosition();
        url = `${weatherUrl}&appid=${APIKEY}&lat=${coords.latitude}&lon=${coords.longitude}&lang=fr&units=metric`;
      }

      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          console.log(data.main.temp + this.chosenCity);
          this.name = data.name;
          this.temp = data.main.temp;
          this.description = data.weather[0].description;
          this.icon = data.weather[0].icon;

          loading.dismiss();
        });
    },

    printMydate: function () {
      return moment(new Date()).locale("fr").format("LLLL");
    },
  },
  mounted: function () {
    console.log(new Date());
    this.mydate = this.printMydate();
  },
});
</script>

<style scoped>
.title {
  font-size: large;
  font-weight: 700;
  text-align: center;
  border: 0px;
}

.elt {
  text-align: center;
  font-weight: 600;
  font-style: italic;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

ion-content.background {
  --background: url(../../public/assets/background-morning.jpeg) 0 0/100% 100%
    no-repeat;
}

ion-item {
  --background: transparent !important;
}
</style>
