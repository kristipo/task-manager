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
      --background-color: #bfbfbf;
      opacity: 0.2;
    }

    &.home {
      --background-color: #6e6eff;
    }

    &.personal {
      --background-color: #ffdda3;
    }

    &.work {
      --background-color: #87ff87;
    }
  }
</style>