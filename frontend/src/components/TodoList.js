// frontend/src/components/TodoList.js

import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

export default TodoList;
