import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import { Edit3, Trash2, GripHorizontal, User as UserIcon } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onMove: (task: Task, newX: number, newY: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onMove,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    onMove(task, data.x, data.y);
  };

  const priorityColors: Record<TaskPriority, string> = {
    LOW: '#10b981',
    MEDIUM: '#f59e0b',
    HIGH: '#ef4444',
  };

  const statusBadges: Record<TaskStatus, { label: string; class: string }> = {
    TODO: { label: 'To Do', class: 'badge-todo' },
    IN_PROGRESS: { label: 'In Progress', class: 'badge-progress' },
    DONE: { label: 'Done', class: 'badge-done' },
  };

  return (
    <Draggable
      nodeRef={nodeRef as any}
      handle=".drag-handle"
      position={{ x: task.xCoordinate || 0, y: task.yCoordinate || 0 }}
      onStop={handleStop}
      bounds="parent"
    >
      <div ref={nodeRef} className={`task-card status-${task.status.toLowerCase()}`}>
        <div className="task-card-header">
          <div className="drag-handle" title="Drag to move on board">
            <GripHorizontal size={18} />
          </div>
          <div className="task-actions">
            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              title="Edit Task"
            >
              <Edit3 size={14} />
            </button>
            <button
              className="icon-btn danger"
              onClick={(e) => {
                e.stopPropagation();
                if (task.id) onDelete(task.id);
              }}
              title="Delete Task"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}

        <div className="task-card-footer">
          <div className="task-meta">
            <select
              className={`status-select ${statusBadges[task.status].class}`}
              value={task.status}
              onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <span
              className="priority-dot"
              style={{ backgroundColor: priorityColors[task.priority] }}
              title={`Priority: ${task.priority}`}
            />
          </div>

          {task.assignee && (
            <div className="assignee-tag" title={`Assigned to ${task.assignee}`}>
              <UserIcon size={12} />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};