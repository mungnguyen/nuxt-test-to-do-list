// import axios from 'axios'

// init state
export const state = () => ({
  listTodo: [],
  todo: {}
})

// getter
export const getters = {}

export const mutations = {
  LIST_TODO(state, listTodo) {
    state.listTodo = listTodo
  },

  SET_TODO(state, todo) {
    // setOpenModal(value) {
    //   this.openModal = value;
    // }
    state.todo = todo
  },

  ADD_TODO(state, todo) {
    state.list.push(todo)
  }
}

export const actions = {
  getAllTodo({ commit }) {
    this.$axios.get('/api/todo').then(res => {
      console.log(res.data)
      commit('LIST_TODO', res.data)
    })
  },

  getTodoById({ commit }, id) {
    this.$axios.get('/api/todo/' + id).then(res => {
      commit('SET_TODO', res.data)
    })
  },

  addTodo({ dispatch }, todo) {
    this.$axios.post('/api/todo', todo).then(res => {
      dispatch('GET_TODO')
    })
  },

  updateTodo({ dispatch }, todo) {
    this.$axios.put('/api/todo/' + todo.id, todo).then(() => {
      dispatch('getAllTodo')
      dispatch('getTodoById', todo.id)
    })
  },

  deleteTodo({ dispatch }, id) {
    this.$axios.delete('/api/todo/' + id).then(dispatch('getAllTodo'))
  }
}
