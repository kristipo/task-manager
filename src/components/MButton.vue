<template>
  <div
      class="m-button"
      :class="{ secondary, disabled, transparent: withoutBackground }"
      @click.stop="$emit('click')"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "MButton",

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: null
    },

    secondary: {
      type: Boolean,
      default: false
    },

    withoutBackground: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click']
}
</script>

<style scoped lang="scss">
  .m-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    width: fit-content;
    min-width: 60px;
    padding: 5px;
    cursor: pointer;
    --background-color: green;
    background: var(--background-color);

    &.disabled {
      pointer-events: none;
      opacity: 0.7;
    }

    &.secondary {
      --background-color: grey;
    }

    &.transparent {
      --background-color: transparent;
    }
  }

</style>