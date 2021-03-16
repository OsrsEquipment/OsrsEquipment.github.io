<template>
  <div class="loadout-management-container">
    <div
      v-if="loadoutNumber"
      class="loadout-separate-action"
    >
      <osrs-flat-button @click="copyOpposite">
        Copy
      </osrs-flat-button>
      <span>Copy loadout {{ oppositeLoadout }}</span>
    </div>
    <osrs-divider v-if="loadoutNumber" />
    <div class="loadout-selector">
      <label>Select a saved loadout</label>
      <osrs-autocomplete
        v-model="internalLoadout"
        :items="loadouts"
        item-key="uuid"
      />
    </div>
    <osrs-divider />
    <div>
      <osrs-text-input
        v-model="loadoutName"
      />
      <div class="loadout-separate-action">
        <osrs-flat-button @click="save">
          {{ isExistingLoadout ? 'Update' : 'Save' }}
        </osrs-flat-button>
        <span>
          {{ isExistingLoadout ? 'Update' : 'Save' }}
          the
          {{ isExistingLoadout ? 'selected' : 'current' }}
          loadout
        </span>
      </div>
      <div
        v-show="isExistingLoadout"
        class="loadout-separate-action"
      >
        <osrs-flat-button @click="copy">
          Copy
        </osrs-flat-button>
        <span>Copy selected loadout</span>
      </div>
      <div
        v-show="isExistingLoadout"
        class="loadout-separate-action"
      >
        <osrs-flat-button @click="remove">
          Delete
        </osrs-flat-button>
        <span>Delete selected loadout</span>
      </div>
      <div
        class="loadout-separate-action"
      >
        <osrs-flat-button @click="reset">
          Reset
        </osrs-flat-button>
        <span>Start a fresh loadout</span>
      </div>
    </div>
    <message-dialog ref="messageDialog" />
    <confirmation-dialog ref="confirmationDialog" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import OsrsAutocomplete from '../OsrsAutocomplete.vue';
import OsrsFlatButton from '../OsrsFlatButton.vue';
import OsrsTextInput from '../OsrsTextInput.vue';
import OsrsDivider from '../OsrsDivider.vue';
import ConfirmationDialog from '../dialogs/ConfirmationDialog.vue';
import MessageDialog from '../dialogs/MessageDialog.vue';

export default {
  name: 'LoadoutManagement',
  components: {
    MessageDialog,
    ConfirmationDialog,
    OsrsDivider,
    OsrsTextInput,
    OsrsFlatButton,
    OsrsAutocomplete,
  },
  inject: ['defaultLoadout', 'loadoutNumber'],
  model: {
    prop: 'loadout',
    event: 'change',
  },
  props: {
    loadout: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      lazyLoadout: undefined,
      loadoutName: undefined,
    };
  },
  computed: {
    ...mapState({
      loadouts: (state) => state.loadouts.list,
    }),
    ...mapGetters({
      getLoadoutNames: 'loadouts/getNames',
      getLoadoutByNumber: 'dpsCalc/byNumber',
    }),
    internalLoadout: {
      get() {
        return this.lazyLoadout;
      },
      set(value) {
        this.lazyLoadout = value;
        this.loadoutName = value.name;
        this.$emit('change', this.lazyLoadout);
      },
    },
    isExistingLoadout() {
      return !!(this.lazyLoadout && this.lazyLoadout.uuid);
    },
    oppositeLoadout() {
      return this.loadoutNumber === 1 ? 2 : 1;
    },
  },
  watch: {
    loadout: {
      immediate: true,
      handler(value) {
        this.lazyLoadout = value;
        if (value) {
          this.loadoutName = value.name;
        }
      },
    },
  },
  methods: {
    ...mapActions({
      updateLoadout: 'loadouts/update',
      addLoadout: 'loadouts/add',
      removeLoadout: 'loadouts/remove',
    }),
    save() {
      const payload = { name: this.loadoutName, loadout: this.loadout };
      if (this.loadout.uuid) {
        this.updateLoadout(payload);
      } else {
        this.internalLoadout = this.addLoadout(payload);
      }
    },
    copy() {
      this.internalLoadout = this.addLoadout(
        { name: this.loadoutName, loadout: this.loadout },
      );
    },
    remove() {
      this.$refs
        .confirmationDialog
        .open({ title: 'Delete loadout', message: `You are about to delete <i>${this.internalLoadout.name}</i>.<br>Are you sure?` })
        .then((answer) => {
          if (answer) {
            this.removeLoadout({ loadout: this.internalLoadout });
            this.internalLoadout = this.defaultLoadout;
          }
        });
    },
    reset() {
      this.internalLoadout = this.defaultLoadout;
    },
    copyOpposite() {
      this.internalLoadout = this.getLoadoutByNumber(this.oppositeLoadout);
    },
  },
};
</script>

<style scoped>

.loadout-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loadout-separate-action {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin: 5px;
}

.loadout-separate-action > span {
  margin-left: 5px;
}
</style>
