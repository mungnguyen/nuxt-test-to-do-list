const db = require('../models')

class ToDoReq {
  constructor(req) {
    this.title = req.body.title
    this.body = req.body.body
    this.startDate = req.body.startDate
    this.endDate = req.body.endDate
  }
}

exports.getAllTodo = (req, res) => {
  db.ToDo.findAll().then(result => {
    res.json(result)
  })
}

exports.getTodoById = (req, res) => {
  db.ToDo.findAll({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
}

exports.addTodo = (req, res) => {
  db.ToDo.create(new ToDoReq(req)).then(result => res.json(result))
}

exports.updateTodo = (req, res) => {
  db.ToDo.update(new ToDoReq(req), {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
}

exports.deleteTodo = (req, res) => {
  db.ToDo.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
}
