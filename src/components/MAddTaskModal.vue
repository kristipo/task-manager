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
      <div class="create-form">
        <div class="form-item">
          <m-form-label label="Task:" />
          <input
              v-model="task"
              placeholder="Enter task"
          >
        </div>
        <div class="form-item">
          <m-form-label label="Date:" />
          <input
              v-model="date"
              type="date"
          >
        </div>
        <div class="form-item">
          <m-form-label label="Type:" />
          <select v-model="type">
            <option
                v-for="(type, ind) in TYPES"
                :key="ind">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <m-form-label label="Description:" />
          <textarea v-model="body" rows="4"/>
        </div>
      </div>
    </div>
  </m-modal>
</template>

<script>
import MModal from "@/components/MModal";
import MFormLabel from "@/components/MFormLabel";
import { ACTION_CREATE_TASK, ACTION_EDIT_TASK } from "@/store";

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

  components: {
    MFormLabel,
    MModal
  },

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
      task: 'task 1',
      date: '2022-12-01',
      type: 'animal',
      body: 'body ddddd 1111d555d 555',
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
        this.date = date.split('.').reverse().join('-')
        this.task = task
        this.body = this.item?.body || ''
      }
    }
  },

  methods: {
    hide() {
      this.$emit('input', false)
    },

    reset() {
      // this.task = this.date = this.type = this.body = ''
      this.task = 'task 1'
      this.date = '2022-12-01'
      this.type = 'animal'
      this.body = 'body ddddd 1111d555d 555'
    },

    async submit() {
      const date = this.date.split('-').reverse().join('.')
      await this.$store.dispatch(this.editMode ? ACTION_EDIT_TASK : ACTION_CREATE_TASK, {
        id: this.item?.id || null,
        title: [capitalizeFirst(this.type), date, this.task].join('-'),
        body: this.body,
        completed: this.item?.completed || false
      })
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .add-modal-content-container {
    display: flex;
    justify-content: center;

    .create-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;

      .form-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    input, select, textarea {
      min-width: 300px;
    }
  }

</style>