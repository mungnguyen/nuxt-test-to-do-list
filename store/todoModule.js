// import axios from 'axios'

// init state
export const state = () => ({
  listTodo: [],
  todo: {},
  updateSuccess: false,
  deleteSuccess: false
})

// getter
export const getters = {}

export const mutations = {
  LIST_TODO(state, listTodo) {
    state.listTodo = listTodo
  },

  SET_TODO(state, todo) {
    state.todo = todo
  },

  ADD_TODO(state, todo) {
    state.listTodo.push(todo)
  },

  SET_UPDATE_SUCCESS(state, updateSuccess) {
    state.updateSuccess = updateSuccess
  },

  SET_DELETE_SUCCESS(state, deleteSuccess) {
    state.deleteSuccess = deleteSuccess
  }
}

export const actions = {
  async getAllTodo({ commit }) {
    const { data } = await this.$axios.get('/api/todo')
    commit('LIST_TODO', data)
  },

  async getTodoById({ commit }, id) {
    const { data } = await this.$axios.get('/api/todo/' + id)
    if (data) {
      commit('SET_TODO', data[0])
    }
  },

  async addTodo({ commit }, todo) {
    const { data } = await this.$axios.post('/api/todo', todo)
    commit('ADD_TODO', data)
  },

  async updateTodo({ dispatch, commit }, todo) {
    const { data } = await this.$axios.put('/api/todo/' + todo.id, todo)

    if (data) {
      commit('SET_UPDATE_SUCCESS', true)
    } else {
      commit('SET_UPDATE_SUCCESS', false)
    }
    dispatch('getAllTodo')
    dispatch('getTodoById', todo.id)
  },

  async deleteTodo({ dispatch, commit }, id) {
    const { data } = await this.$axios.delete('/api/todo/' + id)

    if (data) {
      commit('SET_DELETE_SUCCESS', true)
    } else {
      commit('SET_DELETE_SUCCESS', false)
    }

    dispatch('getAllTodo')
  }
}
