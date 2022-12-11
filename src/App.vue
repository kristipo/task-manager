<template>
  <div id="app">
    <div class="home-page">
      <div class="header">
        <span>Tasks</span>
        <div class="action-buttons">
          <m-button
              :text="`${'HIDE' || 'SHOW'} completed`"
              without-background
              @click="filterDisplayedItems"
          />
          <m-button
              text="Add"
              without-background
              @click="addModalVisible = true"
          />
        </div>
      </div>
      <template v-if="allTasks.length !== 0">
        <div class="items-container">
          <m-task-preview
              v-for="task in allTasks"
              :key="task.id"
              :item="task"
              @edit="editTask"
              @remove="triggerRemove"
              @update-state="task.completed = $event"
          />
        </div>
      </template>
      <div
          v-else
          class="no-data-message"
      >
        <div class="title">No data to display</div>
        <span>Click to ADD</span>
      </div>
    </div>
    <m-add-task-modal
        v-model="addModalVisible"
        :item="selected"
    />
    <m-confirm-modal
        v-model="removeModalVisible"
        :item="selected"
        @remove="removeTask"
    />
  </div>
</template>

<script>
import MAddTaskModal from "@/components/MAddTaskModal.vue";
import MButton from "@/components/MButton.vue";
import MConfirmModal from "@/components/MConfirmModal.vue";
import MTaskPreview from "@/components/MTaskPreview";
import { mapGetters } from "vuex";
import { ACTION_DELETE_TASK, ACTION_FETCH_TASKS } from "@/store";

export default {
  components: {
    MAddTaskModal,
    MButton,
    MConfirmModal,
    MTaskPreview
  },

  data() {
    return {
      addModalVisible: false,
      selected: null,
      removeModalVisible: false,
      items: []
    }
  },

  computed: {
    ...mapGetters(['allTasks'])
  },

  watch: {
    addModalVisible(value) {
      if (!value) {
        this.selected = null
      }
    },

    removeModalVisible(value) {
      if (!value) {
        this.selected = null
      }
    }
  },

  methods: {
    editTask(item) {
      this.addModalVisible = true
      this.selected = item
    },

    filterDisplayedItems() {},

    async removeTask(id) {
      await this.$store.dispatch(ACTION_DELETE_TASK, id)
      this.removeModalVisible = false
    },

    triggerRemove(item) {
      this.selected = item
      this.removeModalVisible = true
    }
  },

  async created() {
    await this.$store.dispatch(ACTION_FETCH_TASKS)
  }
}

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #383838;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;

  .home-page {
    flex-direction: column;
    display: flex;
    gap: 15px;
    padding: 20px;
    flex: 1;

    .items-container {
      flex-direction: column;
      display: flex;
      gap: 15px;
      padding: 20px;
      height: 100%;
    }

    .header {
      display: flex;
      border-bottom: 3px solid black;
      margin-bottom: 30px;
      align-items: flex-end;
      justify-content: space-between;

      span {
        font-size: 40px;
        margin-left: 15px;
      }

      .action-buttons {
        display: flex;
        gap: 10px;
      }
    }

    .no-data-message {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .title {
        font-size: 20px;
        font-weight: bold;
      }

      span {
        color: grey;
      }
    }
  }
}
</style>
