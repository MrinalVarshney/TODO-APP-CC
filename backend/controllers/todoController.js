// backend/controllers/todoController.js

const Todo = require('../models/todoModel');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Add a new todo
const addTodo = async (req, res) => {
  const { text } = req.body;

  const newTodo = new Todo({
    text,
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update todo status
const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getTodos, addTodo, updateTodo };
