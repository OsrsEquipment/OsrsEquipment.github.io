<template>
  <v-dialog
    v-model="internalDialog"
    min-width="300px"
    max-width="100%"
    width="500px"
  >
    <osrs-container class="message-dialog-container">
      <div class="message-dialog-title osrs-text-quill-8">
        {{ title }}
      </div>
      <div
        v-html="message"
        class="message-dialog-message"
      >
      </div>
      <div class="message-dialog-actions">
        <osrs-flat-button
          class="message-dialog-action"
          @click="close"
        >
          OK
        </osrs-flat-button>
      </div>
    </osrs-container>
  </v-dialog>
</template>

<script>
import OsrsContainer from '../OsrsContainer.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';

export default {
  name: 'MessageDialog',
  components: { OsrsFlatButton, OsrsContainer },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lazyDialog: false,
      title: undefined,
      message: undefined,
    };
  },
  computed: {
    internalDialog: {
      get() {
        return this.lazyDialog;
      },
      set(value) {
        this.lazyDialog = value;
        this.$emit('update:dialog', value);
      },
    },
  },
  methods: {
    open({ title, message }) {
      this.internalDialog = true;
      this.title = title;
      this.message = message;
    },
    close() {
      this.internalDialog = false;
    },
  },
};
</script>

<style scoped>
.message-dialog-container {
  padding: 15px;
}

.message-dialog-title {
  font-size: 32px;
}

.message-dialog-message {
  line-height: 1em;
  white-space: pre;
}

.message-dialog-actions {
  display: flex;
  justify-content: center;
  margin: 10px 5px 0 5px;
}

.message-dialog-action {
  width: 72px;
}
</style>
