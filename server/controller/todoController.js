const db = require('../models')

class ToDoReq {
  constructor(req) {
    this.title = req.body.title
    this.body = req.body.body
    this.startDate = req.body.startDate
    this.endDate = req.body.endDate
    this.doneDate = req.body.doneDate ? req.body.doneDate : null
    this.tick = req.body.tick ? req.body.tick : false
  }
}

exports.getAllTodo = async (req, res) => {
  const result = await db.ToDo.findAll()
  res.json(result)
}

exports.getTodoById = async (req, res) => {
  const result = await db.ToDo.findAll({
    where: {
      id: req.params.id
    }
  })
  res.json(result)
}

exports.addTodo = async (req, res) => {
  const result = await db.ToDo.create(new ToDoReq(req))
  res.json(result)
}

exports.updateTodo = async (req, res) => {
  const result = await db.ToDo.update(new ToDoReq(req), {
    where: {
      id: req.params.id
    }
  })
  res.json(result)
}

exports.deleteTodo = async (req, res) => {
  const result = await db.ToDo.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(result)
}
