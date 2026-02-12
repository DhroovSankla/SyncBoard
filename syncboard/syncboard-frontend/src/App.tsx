import React, { useEffect, useState } from 'react';
import { connectWebSocket } from './services/WebSockectService';
import { Board } from './components/Board';
import { Task } from './types/Task';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // 1. Fetch initial tasks from your MySQL DB via Spring Boot
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to fetch tasks:", err));

    // 2. Start real-time sync
    connectWebSocket((updatedTask) => {
      setTasks((prev) => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    });
  }, []);
  

  return (
    <div className="App">
      <header style={{ padding: '10px 20px', background: '#282c34', color: 'white' }}>
        <h1>SyncBoard</h1>
      </header>
      <Board tasks={tasks} />
      <h3>No tasks found. Try adding some to the MySQL database!</h3>
    </div>
    
  );
};

export default App;