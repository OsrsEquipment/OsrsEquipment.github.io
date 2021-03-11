<template>
  <v-app class="toolscape-application-wrapper">
    <v-main class="">
      <osrs-navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import OsrsNavbar from './components/OsrsNavbar.vue';

export default {
  name: 'App',
  components: { OsrsNavbar },
};
</script>

<style>
@import './assets/fonts/stylesheet.css';
@import './assets/osrs-vars.css';
@import './assets/custom-styles.css';
</style>

<style scoped>
.toolscape-application-wrapper {
  background: var(--osrs-darkest-brown) !important;
}
</style>
