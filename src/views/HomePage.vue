<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Ma météo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding class="background" :fullscreen="true">
      <div class="ion-text-center">
        <!-- <ion-datetime displayFormat="DDDD,D MMMM YYYY" locale="fr-FR" description="true"></ion-datetime> -->
        <p color="primary-contrast">{{ new Date() }}</p>
      </div>
      <ion-item>
        <ion-label>Ville: </ion-label>
        <ion-select placeholder="Choisir" v-model="villeChoisie">
          <ion-select-option value="Montréal">Montréal</ion-select-option>
          <ion-select-option value="Laval">Laval</ion-select-option>
          <ion-select-option value="Québec">Québec</ion-select-option>
          <ion-select-option value="curentPosition">Position actuelle</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label class="title">{{ villeChoisie }}</ion-label>
      </ion-item>
    </ion-content>
    <ion-footer>
      <ion-toolbar color="secondary">
        <ion-title>Andreea&Yanan</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonLabel, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
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
    IonSelectOption
  },
  data() {
    return {
      villeChoisie: "",
    }
  }
});
</script>

<style scoped>
.title {
  font-size: large;
  font-weight: 900;
  text-align: center;
}

ion-content.background {
  --background: url(../../public/assets/background-morning.jpeg) 0 0/100% 100% no-repeat;
}

ion-item {
  --background: transparent !important;
}
</style>
