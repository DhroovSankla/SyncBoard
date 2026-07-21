import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import { TaskCard } from './TaskCard';
import { Filter, Search, RotateCcw } from 'lucide-react';

interface BoardProps {
  tasks: Task[];
  onTaskMove: (task: Task, newX: number, newY: number) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (id: number) => void;
  onTaskStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export const Board: React.FC<BoardProps> = ({
  tasks,
  onTaskMove,
  onTaskEdit,
  onTaskDelete,
  onTaskStatusChange,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.assignee && task.assignee.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="board-wrapper">
      <div className="board-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks or assignees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          {(statusFilter !== 'ALL' || priorityFilter !== 'ALL' || searchTerm !== '') && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setStatusFilter('ALL');
                setPriorityFilter('ALL');
                setSearchTerm('');
              }}
              title="Reset Filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="board-canvas">
        {filteredTasks.length === 0 ? (
          <div className="empty-board">
            <p>No tasks found on the board.</p>
            <span>Click "Create Task" in the header to add your first task!</span>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id ?? `temp-${task.title}-${task.xCoordinate}`}
              task={task}
              onMove={onTaskMove}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
              onStatusChange={onTaskStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;