<template>
  <m-modal
      :value="value"
      header="Delete task"
      cancel-text="Cancel"
      ok-text="Delete"
      @hide="$emit('input', false)"
      @ok="$emit('remove', item.id)"
  >
    <div class="m-confirm-modal-content">
      Delete {{ item?.title }} &#63;
    </div>
  </m-modal>
</template>

<script>
import MModal from "@/components/MModal.vue";
export default {
  name: "MConfirmModal",

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
  }
}
</script>

<style lang="scss" scoped>
  .m-confirm-modal-content {
    padding: 20px;
  }
</style>