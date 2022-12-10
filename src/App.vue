<template>
  <div id="app">
    <div class="home">
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
      <m-task-preview
          v-for="task in items"
          :key="task.id"
          :item="task"
          @edit="editTask"
          @remove="triggerRemove"
          @update-state="task.checked = $event"
      />
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

    removeTask(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.removeModalVisible = false
    },

    triggerRemove(item) {
      this.selected = item
      this.removeModalVisible = true
    }
  },

  created() {
    this.items = [
      {
        id: 1,
        title: 'Home 21/25/55555',
        description: 'newriel kemfel mfem eofme formiel kemfel mfem eofme formiel kemfel mfem eofme form iel kemfel mfem eofme formiel kemfel mfem eofme formiel kemfel mfem eofme formiel kemfel mfem eofme formiel kemfel mfem eofme formiel kemfel mfem eofme form frmf',
        type: 'animal',
        checked: false
      },
      {
        id: 2,
        title: 'Home 21/25/55555',
        type: 'animal',
        description: 'newrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewriel0newrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewrielnewriel',
        checked: false
      },
      {
        id: 3,
        title: 'Home 21/25/55555',
        type: 'work',
        checked: false
      },
      {
        id: 4,
        title: 'Home 21/25/55555',
        type: 'personal',
        checked: false
      }
    ]
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;

  .home {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    height: 100%;

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
  }
}
</style>
