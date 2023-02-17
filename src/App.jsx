import { useState, useEffect } from 'react';

import Header from './components/Header';
import Tasks from './components/Tasks';

const LOCAL_STORAGE_KEY = 'ls-tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if(localStorageTasks) {
      const localTasks = [...JSON.parse(localStorageTasks)];
      const filteredTasks = localTasks.filter(task => task.title !== '');
      setTasks(filteredTasks);
    }
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const handleAddTask = (title) => {
    if(title === '') return;

    saveTasks([
      ...tasks,
      {
        title: title,
        completed: false,
        id: crypto.randomUUID()
      }
    ]);
  };

  const handleRemoveTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);

    saveTasks(filteredTasks);
  };

  const handleCompleteTask = (id) => {
    const filteredTasks = tasks.map(task => {
      if(task.id === id) {
        return (
          {
            ...task,
            completed: !task.completed,
          }
        );
      }

      return task;
    });

    saveTasks(filteredTasks);
  };

  const handleEditTask = (id, newTitle) => {
    const filteredTasks = tasks.map(task => {
      if(task.id === id) {
        return (
          {
            ...task,
            title: newTitle,
          }
        );
      }

      return task;
    });

    saveTasks(filteredTasks);
  };

  return (
    <>
      <Header handleAddTask={handleAddTask} />
      <Tasks tasks={tasks} handleRemoveTask={handleRemoveTask}
        handleCompleteTask={handleCompleteTask} handleEditTask={handleEditTask} />
    </>
  );
}
