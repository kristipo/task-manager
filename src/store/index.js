import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";

export const ACTION_ADD_TASK = 'addTask'
export const ACTION_EDIT_TASK = 'editTask'
export const ACTION_DELETE_TASK = 'deleteTask'
const MUTATION_UPLOAD_TASK = 'uploadTask'
const MUTATION_REMOVE_TASK = 'removeTask'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: {}
  },
  getters: {
    allTasks(state) {
      return Object.values(state.tasks)
    }
  },

  mutations: {
    [MUTATION_REMOVE_TASK](state, id) {
      const tasks = Object.values(state.tasks)
      state.tasks = Object.fromEntries(tasks.filter(t => t.id !== id).map(t => [t.id, t]))
    },

    [MUTATION_UPLOAD_TASK](state, task) {
      state.tasks = { ...state.tasks, [task.id]: task }
    }
  },
  actions: {
    async [ACTION_ADD_TASK]({ commit }, task) {
      const id = await api.addTask(task) + Math.floor(Math.random() * 10000000)

      commit(MUTATION_UPLOAD_TASK, { ...task, id })
    },

    async [ACTION_EDIT_TASK]({ commit, }, task) {
      await api.editTask(task)

      commit(MUTATION_UPLOAD_TASK, task)
    },

    async [ACTION_DELETE_TASK]({ commit }, id) {
      await api.deleteTask(id)

      commit(MUTATION_REMOVE_TASK, id)
    }
  }
})
