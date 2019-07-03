module.exports = function(app) {
  const {
    getAllTodo,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
  } = require('../controller/todoController')

  app.get('/api/todo', getAllTodo)
  app.get('/api/todo/:id', getTodoById)
  app.post('/api/todo', addTodo)
  app.put('/api/todo/:id', updateTodo)
  app.delete('/api/todo/:id', deleteTodo)
}
