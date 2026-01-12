import SockJS from 'sockjs-client';
import { over, Client } from 'stompjs';
import { Task } from '../types/Task';

let stompClient: Client | null = null;

export const connectWebSocket = (onMessageReceived: (task: Task) => void) => {
    const socket = new SockJS('http://localhost:8080/ws'); // Matches your Kotlin Config
    stompClient = over(socket);
    stompClient.connect({}, () => {
        stompClient?.subscribe('/topic/updates', (payload) => {
            onMessageReceived(JSON.parse(payload.body));
        });
    });
};

export const sendTaskUpdate = (task: Task) => {
    stompClient?.send("/app/move-task", {}, JSON.stringify(task));
};