import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [editTaskId, setEditTaskId] = useState(null); // ✅ Track editing


 

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/task', {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const editTask = (task) => {
    setEditTaskId(task._id);
    setTitle(task.title);
    setDesc(task.description || '');
  };
  
  const addOrUpdateTask = async (e) => {
    e.preventDefault();

    if (editTaskId) {
      // 🔁 Update Task
      try {
        await axios.put(
          `http://localhost:4000/task/${editTaskId}`,
          { title, description },
          { withCredentials: true }
        );
        toast.success('Task updated!');
        setEditTaskId(null);
        setTitle('');
        setDesc('');
        fetchTasks();
      } catch (err) {
        toast.error('Error updating task');
      }
    } else {
      // ➕ Add Task
      try {
        await axios.post('http://localhost:4000/task', { title, description }, { withCredentials: true });
        setTitle('');
        setDesc('');
        toast.success('Task added!');
        fetchTasks();
      } catch (err) {
        toast.error('Error adding task');
      }
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/task/${id}`, {
        withCredentials: true,
      });
      toast.success('Task deleted!');
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error('Error deleting task');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:4000/task/${id}`,
        { completed: !completed },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task', err);
    }
  };



  return (
    <>

      <div className='taskContainer'>
        <form
          onSubmit={addOrUpdateTask}
          className='taskForm'>
          <input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder='Description'
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type='submit'>{editTaskId ? 'Update Task' : 'Add Task'}</button>
        </form>

        <ul className='taskList'>
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`taskItem ${task.completed ? 'completed' : ''}`}>
              {/* ✅ Checkbox to toggle complete */}
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleComplete(task._id, task.completed)}
                className='taskCheckbox'
              />

              {/* ✅ Title & Description */}
              <span>
                <span className='title'>{task.title}</span> - {task.description}
              </span>

              {/* ✅ Action Buttons */}
              <div>
                <button onClick={() => editTask(task)}>✏️ Edit</button>
                <button onClick={() => deleteTask(task._id)}>❌ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </>
  );
};

export default Task; 