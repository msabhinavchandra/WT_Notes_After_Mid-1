import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Handle input field change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add new task to the list
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue(''); // Clear input field after adding
    }
  };

  // Delete a task from the list
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>

      {/* Input Field */}
      <div>
        <input 
          type="text" 
          placeholder="Enter a task..." 
          value={inputValue} 
          onChange={handleInputChange} 
        />
        <button 
          onClick={handleAddTask}
        >
          Add Todo
        </button>
      </div>

      {/* List of Tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button 
              onClick={() => handleDeleteTask(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
