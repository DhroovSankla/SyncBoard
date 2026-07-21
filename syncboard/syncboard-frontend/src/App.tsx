import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Board } from './components/Board';
import { AuthModal } from './components/AuthModal';
import { TaskFormModal } from './components/TaskFormModal';
import { Task, TaskStatus } from './types/Task';
import { User, AuthResponse } from './types/User';
import { authService, taskService } from './services/api';
import { connectWebSocket, sendTaskMove, sendTaskUpdate } from './services/WebSocketService';
import './App.css';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load existing tasks
  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  // Load user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService
        .getCurrentUser()
        .then((userData) => setUser(userData))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
    fetchTasks();
  }, []);

  // Real-time WebSocket incoming updates handler
  const handleIncomingTaskUpdate = useCallback((updatedTask: Task) => {
    setTasks((prevTasks) => {
      // Check if task deleted
      if (updatedTask.title === 'DELETED') {
        return prevTasks.filter((t) => t.id !== updatedTask.id);
      }
      const existsIndex = prevTasks.findIndex((t) => t.id === updatedTask.id);
      if (existsIndex >= 0) {
        const copy = [...prevTasks];
        copy[existsIndex] = updatedTask;
        return copy;
      } else {
        return [...prevTasks, updatedTask];
      }
    });
  }, []);

  // Connect to STOMP WebSocket
  useEffect(() => {
    const disconnect = connectWebSocket(handleIncomingTaskUpdate, (status) => {
      setIsConnected(status);
    });
    return () => disconnect();
  }, [handleIncomingTaskUpdate]);

  // Auth handlers
  const handleAuthSuccess = (authData: AuthResponse) => {
    localStorage.setItem('token', authData.token);
    setUser({
      id: authData.id,
      username: authData.username,
      email: authData.email,
    });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Task Action Handlers
  const handleTaskMove = (task: Task, newX: number, newY: number) => {
    const updated: Task = { ...task, xCoordinate: newX, yCoordinate: newY };
    // Optimistic UI update
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    // Broadcast via WebSocket
    sendTaskMove(updated);
  };

  const handleTaskStatusChange = (task: Task, newStatus: TaskStatus) => {
    const updated: Task = { ...task, status: newStatus };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    sendTaskUpdate(updated);
  };

  const handleTaskSave = async (taskData: Partial<Task>) => {
    try {
      if (taskData.id) {
        const updated = await taskService.updateTask(taskData.id, taskData as Task);
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      } else {
        const created = await taskService.createTask(taskData as Task);
        setTasks((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleTaskDelete = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="app-container">
      <Navbar
        user={user}
        isConnected={isConnected}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenCreateTask={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }}
      />

      <Board
        tasks={tasks}
        onTaskMove={handleTaskMove}
        onTaskEdit={(task) => {
          setEditingTask(task);
          setIsTaskModalOpen(true);
        }}
        onTaskDelete={handleTaskDelete}
        onTaskStatusChange={handleTaskStatusChange}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleTaskSave}
        initialTask={editingTask}
      />
    </div>
  );
};

export default App;