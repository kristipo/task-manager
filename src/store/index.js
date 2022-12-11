import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api";

export const ACTION_CREATE_TASK = 'createTask'
export const ACTION_EDIT_TASK = 'editTask'
export const ACTION_DELETE_TASK = 'deleteTask'
export const ACTION_FETCH_TASKS = 'fetchTasks'

const MUTATION_LOAD_TASKS = 'loadTasks'
const MUTATION_ADD_TASK = 'addTask'
const MUTATION_REMOVE_TASK = 'removeTask'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: {}
  },
  getters: {
    allTasks(state) {
      return Object.values(state.tasks)
    },

    tasksStates(state) {
      return Object.fromEntries(Object.values(state.tasks).map(t => [t.id, t.completed]))
    }
  },

  mutations: {
    [MUTATION_REMOVE_TASK](state, id) {
      const tasks = Object.values(state.tasks)
      state.tasks = Object.fromEntries(tasks.filter(t => t.id !== id).map(t => [t.id, t]))
    },

    [MUTATION_ADD_TASK](state, task) {
      state.tasks = { ...state.tasks, [task.id]: task }
    },

    [MUTATION_LOAD_TASKS](state, items) {
      state.tasks = Object.fromEntries(items.map(item => [item.id, item]))
    }
  },
  actions: {
    async [ACTION_CREATE_TASK]({ commit }, task) {
      const id = await api.addTask(task) + Math.floor(Math.random() * 10000000)

      commit(MUTATION_ADD_TASK, { ...task, id })
    },

    async [ACTION_EDIT_TASK]({ commit, }, task) {
      await api.editTask(task)

      commit(MUTATION_ADD_TASK, task)
    },

    async [ACTION_DELETE_TASK]({ commit }, id) {
      await api.deleteTask(id)

      commit(MUTATION_REMOVE_TASK, id)
    },

    async [ACTION_FETCH_TASKS]({ commit }) {
      const items = await api.fetchTasks()

      commit(MUTATION_LOAD_TASKS, items)
    }
  }
})
