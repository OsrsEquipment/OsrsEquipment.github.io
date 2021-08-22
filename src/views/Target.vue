<template>
  <v-container>
    <v-row>
      <v-col>
        <target-editor />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TargetEditor from '../components/target/TargetEditor.vue';

export default {
  components: { TargetEditor },
};
</script>
