<template>
  <div
      class="m-task-container"
      :class="[type]"
  >
    <slot></slot>
  </div>
</template>

<script>
import _ from 'lodash'

const ANIMAL_CLASS = 'animal'
const DONE_CLASS = 'done'
const HOME_CLASS = 'home'
const PERSONAL_CLASS = 'personal'
const WORK_CLASS = 'work'
export default {
  name: "MTaskContainer",

  props: {
    // [ANIMAL_CLASS]: {
    //   type: Boolean,
    //   default: false
    // },
    // [DONE_CLASS]: {
    //   type: Boolean,
    //   default: false
    // },
    // [HOME_CLASS]: {
    //   type: Boolean,
    //   default: false
    // },
    // [PERSONAL_CLASS]: {
    //   type: Boolean,
    //   default: false
    // },
    // [WORK_CLASS]: {
    //   type: Boolean,
    //   default: false
    // },
    type: {
      type: String,
      default: ''
    }
  },

  computed: {
    colorClass() {
      return _.filter([ANIMAL_CLASS, DONE_CLASS, HOME_CLASS, PERSONAL_CLASS, WORK_CLASS], clazz => this[clazz])
    }
  }
}
</script>

<style scoped lang="scss">
  .m-task-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 5px;
    --background-color: #fafafa;
    background: var(--background-color);
    border: 1px solid black;

    &.animal {
      --background-color: #ffff53;
    }

    &.done {
      --background-color: grey;
      opacity: 0.2;
    }

    &.home {
      --background-color: blue;
    }

    &.personal {
      --background-color: orange;
    }

    &.work {
      --background-color: green;
    }
  }
</style>