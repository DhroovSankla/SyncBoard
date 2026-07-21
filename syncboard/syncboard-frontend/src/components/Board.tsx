import React from 'react';
import { Task } from '../types/Task';
import { TaskCard } from './TaskCard';
import { sendTaskUpdate } from '../services/WebSockectService'; //

interface BoardProps {
  tasks: Task[];
}

export const Board: React.FC<BoardProps> = ({ tasks }) => {
  
  // This function handles the logic when a task is moved on the board
  const handleTaskMove = (task: Task, newX: number, newY: number) => {
    const updatedTask: Task = { 
      ...task, 
      xCoordinate: newX, 
      yCoordinate: newY 
    };
    
    // Sends the update to the Kotlin backend via STOMP
    sendTaskUpdate(updatedTask);
  };

  return (
    <div 
      className="board-container" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '85vh', 
        backgroundColor: '#f0f2f5',
        overflow: 'hidden',
        // Adds a nice grid background for the board
        backgroundImage: 'radial-gradient(#d1d1d1 1px, transparent 1px)',
        backgroundSize: '20px 20px' 
      }}
    >
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          // We'll use this prop when we add the drag logic
          onMove={(x: number, y: number) => handleTaskMove(task, x, y)} 
        />
      ))}
    </div>
  );
};

// Fallback to ensure TypeScript treats this as a module
export default Board;