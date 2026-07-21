import React, { useRef } from 'react'; //
import Draggable from 'react-draggable';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onMove: (x: number, y: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onMove }) => {
  // 1. Create a ref for the draggable element
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef} // 2. Pass the ref here to fix the findDOMNode error
      defaultPosition={{ x: task.xCoordinate, y: task.yCoordinate }}
      onStop={(e, data) => onMove(data.x, data.y)}
    >
      {/* 3. Attach the same ref to the outermost div */}
      <div 
        ref={nodeRef} 
        className="task-card" 
        style={{ 
          position: 'absolute', 
          cursor: 'grab',
          padding: '15px',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '200px',
          zIndex: 100,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>{task.title}</h4>
        <p style={{ fontSize: '14px', color: '#555' }}>{task.description}</p>
      </div>
    </Draggable>
  );
};