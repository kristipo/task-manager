<template>
  <m-modal
      :value="value"
      :header="eventTypeText"
      :ok-disabled="disabled"
      :ok-text="eventTypeText"
      cancel-text="Cancel"
      @hide="$emit('input', false)"
      @ok="submit"
  >
    <div class="add-modal-content-container">
      <span>Task:</span>
      <input
          v-model="title"
          placeholder="Enter task"
      >
      <span>Date:</span>
      <input
          v-model="date"
          type="date"
      >
      <span>Type:</span>
      <select
          v-model="type"
      >
        <option
            v-for="(type, ind) in TYPES"
            :key="ind">
          {{ type }}
        </option>
      </select>
      <span>Description:</span>
      <textarea v-model="description" rows="3"/>
    </div>
  </m-modal>
</template>

<script>
import MModal from "@/components/MModal.vue";
import _ from "lodash";

const ANIMAL_CLASS = 'animal'
const HOME_CLASS = 'home'
const PERSONAL_CLASS = 'personal'
const WORK_CLASS = 'work'

const TYPES = [ANIMAL_CLASS, HOME_CLASS, PERSONAL_CLASS, WORK_CLASS]

export default {
  name: "MAddTaskModal",

  components: { MModal },

  props: {
    item: {
      type: Object,
      default: null
    },

    value: {
      type: Boolean,
      required: true
    }
  },

  emits: [
      'input',
      'submit'
  ],

  data() {
    return {
      title: '',
      date: '',
      type: '',
      description: '',
      TYPES
    }
  },

  computed: {
    disabled() {
      return _.isEmpty(this.title && this.type && this.date)
    },

    editMode() {
      return this.item?.id != null
    },

    eventTypeText() {
      return this.editMode ? 'Edit': 'Create'
    }
  },

  watch: {
    value(value) {
      if (!value) {
        this.reset()
        return
      }
      this.title = this.item?.title || ''
      this.date = this.item?.date || ''
      this.type = this.item?.type || ''
      this.description = this.item?.description || ''
    }
  },

  methods: {
    hide() {
      this.$emit('hide')
    },

    reset() {
      this.title = ''
      this.date = ''
      this.type = ''
      this.description = ''
    },

    submit() {
      this.$emit('submit', {
        id: this.item?.id,
        title: this.title,
        date: this.date,
        type: this.type,
        description: this.description,
      })
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .add-modal-content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

</style>