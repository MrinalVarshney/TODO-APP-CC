// frontend/src/components/TodoItem.js

import React from 'react';

const TodoItem = ({ todo, toggleTodo }) => {
  return (
    <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo._id)}
      />
      {todo.text}
    </div>
  );
};

export default TodoItem;
