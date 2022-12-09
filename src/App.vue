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
              @click="modalVisible = true"
          />
        </div>
      </div>
      <m-task-preview
          v-for="task in items"
          :key="task.id"
          :item="task"
          @edit="editTask"
          @update-state="task.checked = $event"
      />
    </div>
    <m-add-task-modal
        v-model="modalVisible"
        :item="selected"
    />
  </div>
</template>

<script>
import MButton from "@/components/MButton.vue";
import MTaskPreview from "@/components/MTaskPreview";
import MAddTaskModal from "@/components/MAddTaskModal.vue";

export default {
  components: {
    MButton,
    MAddTaskModal,
    MTaskPreview
  },

  data() {
    return {
      modalVisible: false,
      selected: null,
      items: []
    }
  },

  watch: {
    modalVisible(value) {
      if (!value) {
        this.selected = null
      }
    }
  },

  methods: {
    editTask(item) {
      this.modalVisible = true
      this.selected = item
    },

    filterDisplayedItems() {}
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
