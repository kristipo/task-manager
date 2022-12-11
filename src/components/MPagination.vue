<template>
  <div class="m-pagination" v-if="pagesCount > 1">
    <div
        v-for="number in pages"
        class="number"
        :class="{ selected: value === number }"
        :key="number"
        @click="$emit('input', number)"
    >
      {{ number }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LIMIT, START_PAGE } from "@/App.vue";

export default {
  name: "MPagination",

  props: {
    count: {
      type: Number,
      required: true
    },

    value: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters(['allTasks']),

    pages() {
      return Array.from({ length: this.pagesCount }, (_, i) => i + 1)
    },

    pagesCount() {
      return Math.ceil(this.count / LIMIT)
    }
  },

  watch: {
    count() {
      this.$emit('input', START_PAGE)
    }
  }
}
</script>

<style scoped lang="scss">
  .m-pagination {
    display: flex;
    gap: 20px;
    position: fixed;
    bottom: 0;
    padding-bottom: 10px;
    width: 100%;
    background: white;

    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;

      &.selected {
        background: blue;
      }
    }
  }
</style>