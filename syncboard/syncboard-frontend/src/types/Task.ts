export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  xCoordinate: number;
  yCoordinate: number;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  createdAt?: string;
  updatedAt?: string;
}