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
          v-model="task"
          placeholder="Enter task"
      >
      <span>Date:</span>
      <input
          v-model="date"
          type="date"
      >
      <span>Type:</span>
      <select v-model="type">
        <option
            v-for="(type, ind) in TYPES"
            :key="ind">
          {{ type }}
        </option>
      </select>
      <span>Description:</span>
      <textarea v-model="body" rows="3"/>
    </div>
  </m-modal>
</template>

<script>
import MModal from "@/components/MModal.vue";

const EDIT_BUTTON_TEXT = 'Edit'
const CREATE_BUTTON_TEXT = 'Create'
const ANIMAL_TYPE = 'animal'
const HOME_TYPE = 'home'
const PERSONAL_TYPE = 'personal'
const WORK_TYPE = 'work'
const TYPES = [ANIMAL_TYPE, HOME_TYPE, PERSONAL_TYPE, WORK_TYPE]

const capitalizeFirst = str => {
  return str[0].toUpperCase() + str.slice(1)
}

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
      task: '',
      date: '',
      type: '',
      body: '',
      TYPES
    }
  },

  computed: {
    disabled() {
      return (this.task && this.type && this.date) === ''
    },

    editMode() {
      return this.item?.id != null
    },

    eventTypeText() {
      return this.editMode ? EDIT_BUTTON_TEXT: CREATE_BUTTON_TEXT
    }
  },

  watch: {
    value(value) {
      if (!value) {
        this.reset()
        return
      }

      if (this.editMode) {
        const [type, date, task] = this.item?.title.split('-')
        this.type = type.toLowerCase()
        const [day, month, year] = date.split('.')
        this.date = [year, month, day].join('-')
        this.task = task
        this.body = this.item?.body || ''
      }
    }
  },

  methods: {
    hide() {
      this.$emit('hide')
    },

    reset() {
      this.task = this.date = this.type = this.body = ''
    },

    submit() {
      const [year, month, day] = this.date.split('-')

      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: [capitalizeFirst(this.type), [day, month, year].join('.'), this.task].join('-'),
          body: this.body,
          completed: this.item?.completed || false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
      this.$emit('submit', {
        id: this.item?.id,
        title: [capitalizeFirst(this.type), [day, month, year].join('.'), this.task].join('-'),
        body: this.body,
        completed: this.item?.completed || false,
        userId: 11
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