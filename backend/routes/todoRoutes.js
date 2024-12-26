// backend/routes/todoRoutes.js

const express = require('express');
const { getTodos, addTodo, updateTodo } = require('../controllers/todoController');

const router = express.Router();

// Get all todos
router.get('/', getTodos);

// Add a new todo
router.post('/', addTodo);

// Mark a todo as completed
router.put('/:id', updateTodo);

module.exports = router;
