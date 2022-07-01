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
        <ion-select placeholder="Choisir" v-model="chosenCity" @ion-change="loadFetch(chosenCity)">
          <ion-select-option type="select" value="Montreal">Montréal</ion-select-option>
          <ion-select-option type="select" value="Laval">Laval</ion-select-option>
          <ion-select-option type="select" value="Quebec">Québec</ion-select-option>
          <ion-select-option>Position actuelle</ion-select-option>
        </ion-select>
      </ion-item>
      <p class="title">{{ chosenCity }}</p>
      <p class="title">{{ temp }} °C</p>
      <p>{{ description }}</p>
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
import { defineComponent, } from "vue";
import moment from "moment";

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
  },
  data() {
    return {
      chosenCity: "Montreal",
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
        message: 'Attendez SVP...',
      });
      await loading.present();
      console.log(city);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${APIKEY}&lang=fr&units=metric`;
      fetch(url).then(reponse => reponse.json()).then(data => {
        console.log(data.main.temp + this.chosenCity);
        this.temp = data.main.temp;
        this.description = data.weather[0].description;
        console.log("Descriptiooooonnnn" + this.description);
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
  font-weight: 900;
  text-align: center;
  border: 0px;
}

ion-content.background {
  --background: url(../../public/assets/background-morning.jpeg) 0 0/100% 100% no-repeat;
}

ion-item {
  --background: transparent !important;
}
</style>
