export interface Task {
    id?: number;
    title: string;
    description: string;
    xCoordinate: number;
    yCoordinate: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}