import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Fetch todos from the backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Toggle todo completion status
  const toggleTodo = (id) => {
    axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/${id}`)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, completed: true } : todo
        ));
      })
      .catch((err) => console.error(err));
  };

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() === '') return; // Prevent adding empty todos
    
    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/`, {
      text: newTodo,
    })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo(''); // Clear input field
      })
      .catch((err) => console.error(err));
  };

  return (
    <Router basename='/todo'>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/completed">Completed Todos</Link>
            </li>
            <li>
              <Link to="/pending">Pending Todos</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={
            <>
              <h1>Todo List</h1>
              <div>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new to-do"
                />
                <button onClick={addTodo}>Add Todo</button>
              </div>
              <TodoList todos={todos} toggleTodo={toggleTodo} />
            </>}>
          </Route>
          <Route path="/completed" element={
            <>
              <h1>Completed Todos</h1>
              <TodoList todos={todos.filter(todo => todo.completed)} toggleTodo={toggleTodo} />
            </>}>
          </Route>
          <Route path="/pending" element={
            <>
              <h1>Pending Todos</h1>
              <TodoList todos={todos.filter(todo => !todo.completed)} toggleTodo={toggleTodo} />
            </>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
