<template>
  <v-container>
    <v-row>
      <v-col>
        <div
          v-if="checking"
          class="in-progress-container"
        >
          <span>Checking for updates</span>
          <v-progress-circular
            class="my-2"
            indeterminate
          />
        </div>
        <div
          v-else-if="!checking && !updating && updateRequired"
          class="need-updates-container"
        >
          <span>{{ updateData.length }} databases need updating</span>
          <v-btn
            class="my-2"
            @click="startUpdate"
          >
            update
          </v-btn>
        </div>
        <div
          v-else-if="updating"
          class="need-updates-container"
        >
          <span>Updating</span>
          <v-progress-circular
            class="my-2"
            indeterminate
          />
        </div>
        <div
          v-else
          class="no-updates-container"
        >
          <span>No updates required</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import DataManager from '../services/data-manager';

export default {
  name: 'DataManager',
  data() {
    return {
      checking: false,
      updating: false,
      updateData: [],
    };
  },
  computed: {
    updateRequired() {
      return this.updateData && this.updateData.length > 0;
    },
  },
  mounted() {
    this.checkForUpdates();
  },
  methods: {
    ...mapActions({
      initMonsters: 'monsters/init',
      initEquipment: 'equipment/init',
    }),
    async checkForUpdates() {
      try {
        this.checking = true;
        this.updateData = await DataManager.checkForUpdates();
      } finally {
        this.checking = false;
      }
    },
    async startUpdate() {
      try {
        this.updating = true;
        await DataManager.update(this.updateData);
        this.initMonsters();
        this.initEquipment();
        this.updateData = await DataManager.checkForUpdates();
      } finally {
        this.updating = false;
      }
    },
  },
};
</script>

<style scoped>
.no-updates-container,
.need-updates-container,
.in-progress-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  font-size: 24px;
}
</style>
