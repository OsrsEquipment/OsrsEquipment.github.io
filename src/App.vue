<template>
  <v-app class="toolscape-application-wrapper">
    <v-main class="">
      <osrs-navbar />
      <router-view />
    </v-main>
    <message-dialog ref="messageDialog" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import ErrorHandler from './plugins/error-handler';
import OsrsNavbar from './components/OsrsNavbar.vue';
import MessageDialog from './components/dialogs/MessageDialog.vue';

export default {
  name: 'App',
  components: { MessageDialog, OsrsNavbar },
  mounted() {
    this.initMonsters();
    this.initEquipment();
    ErrorHandler.setDialogRef(this.$refs.messageDialog);
  },
  methods: {
    ...mapActions({
      initMonsters: 'monsters/init',
      initEquipment: 'equipment/init',
    }),
  },
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
