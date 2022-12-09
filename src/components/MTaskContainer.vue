<template>
  <div
      class="m-task-container"
      :class="[type, { done }]"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "MTaskContainer",

  props: {
    done: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: ''
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