<template>
  <div
      v-if="value"
      ref="modal"
      class="m-modal"
      @click="misclick"
  >
    <div class="m-modal-container">
      <div class="header-container">
        <div class="header">
          {{ header }}
        </div>
        <div
            class="close-button"
            @click="hide"
        >&times;</div>
      </div>
      <slot />
      <div class="m-modal-footer">
        <m-button
            secondary
            :text="cancelText"
            @click="hide"
        />
        <m-button
            :text="okText"
            :disabled="okDisabled"
            @click="$emit('ok')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/MButton";

export default {
  name: "MModal",

  components: {
    MButton
  },

  props: {
    cancelText: {
      type: String,
      required: true
    },

    header: {
      type: String,
      required: true
    },

    okDisabled: {
      type: Boolean,
      default: false
    },

    okText: {
      type: String,
      required: true
    },

    value: {
      type: Boolean,
      required: true
    }
  },

  emits: ['hide', 'ok'],

  methods: {
    hide() {
      this.$emit('hide')
    },

    misclick(ev) {
      if (this.$refs.modal === ev.target) {
        this.hide()
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .m-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);

    .m-modal-container {
      position: relative;
      background: #fafafa;
      width: 600px;
      margin: auto;
      top: 100px;
      padding: 20px;

      .header-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .header {
          display: flex;
          flex: 1;
          font-size: 24px;
          padding: 5px;
          align-items: center;
          justify-content: center;
        }

        .close-button {
          cursor: pointer;
          font-size: 20px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
      }

      .m-modal-footer {
        display: flex;
        gap: 10px;
        width: 100%;
        justify-content: flex-end;
      }
    }
  }
</style>