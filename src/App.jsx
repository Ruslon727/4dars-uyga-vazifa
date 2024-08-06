import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, checked: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleCheck = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  const handleStartEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleUpdateTodo = () => {
    if (editValue.trim()) {
      setTodos(todos.map((todo, i) =>
        i === editIndex ? { ...todo, text: editValue } : todo
      ));
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleToggleCheck(index)}
            />
            {editIndex === index ? (
              <input
                type="text"
                className="edit"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            {editIndex === index ? (
              <button onClick={handleUpdateTodo}>Update</button>
            ) : (
              <button onClick={() => handleStartEdit(index)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
