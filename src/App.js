import React, { useState } from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import './App.css'; // Assuming App.css will be used for any custom CSS if needed

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Plan the DevOps challenge articles', completed: true },
    { id: 2, text: 'Review project READMEs', completed: false },
    { id: 3, text: 'Prepare for Day 20 content', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    const newTask = { id: newId, text: newTaskText.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
        
        <form onSubmit={addTask} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 flex-grow">
                  <button onClick={() => toggleComplete(task.id)} aria-label="Toggle task completion">
                    {task.completed ? (<CheckCircle2 className="text-green-500 h-6 w-6" />) : (<Circle className="text-gray-400 h-6 w-6" />)}
                  </button>
                  <span className={`text-lg flex-grow text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
