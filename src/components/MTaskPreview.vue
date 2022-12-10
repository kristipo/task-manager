<template>
  <m-task-container
      :done="item.checked"
      :type="type"
      @click.native.stop="$emit('edit', item)"
  >
    <div
        class="m-task-preview"
    >
      <input
          :value="item.checked"
          type="checkbox"
          class="task-checkbox"
          @input="updateCheck"
          @click.stop
      />
      <div class="task-content">
        <div class="title">
          {{ item.title }}
        </div>
        <div
            v-if="item.body"
            class="preview-text"
        >
          {{ item.body }}
        </div>
      </div>
      <div class="remove-button" @click.stop="$emit('remove', item)">
        &times;
      </div>
    </div>
  </m-task-container>
</template>

<script>
import MTaskContainer from "@/components/MTaskContainer";
export default {
  name: "MTaskPreview",

  components: {
    MTaskContainer
  },

  emits: [
      'edit',
      'update-state'
  ],

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    type() {
      return this.item.title.split('-')[0].toLowerCase()
    }
  },

  methods: {
    updateCheck(ev) {
      this.$emit('update-state', ev.target.checked)
    }
  }
}
</script>

<style scoped lang="scss">
  .m-task-preview {
    display: grid;
    gap: 20px;
    align-items: center;
    cursor: pointer;
    grid-template-columns: 35px 1fr 35px;

    .task-checkbox {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .task-content {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
      justify-content: center;

      .title {
        color: #383838;
        font-weight: bold;
      }

      .preview-text {
        text-align: left;
        word-break: break-word;
      }
    }

    .remove-button {
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
</style>