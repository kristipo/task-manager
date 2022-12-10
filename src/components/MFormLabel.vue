<template>
  <div class="m-form-label">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: "MFormLabel",

  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .m-form-label {
    margin-bottom: 8px;
  }
</style>