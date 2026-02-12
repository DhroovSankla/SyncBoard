import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Task } from '../types/Task';

let stompClient: Client | null = null;

export const connectWebSocket = (onMessageReceived: (task: Task) => void) => {
    // Corrected endpoint to match your Kotlin WebSocketConfig.kt
    const socket = new SockJS('http://localhost:8080/ws-board'); 

    stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient?.subscribe('/topic/updates', (payload) => {
                onMessageReceived(JSON.parse(payload.body));
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
        },
      reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    stompClient.activate();
};

export const sendTaskUpdate = (task: Task) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/move-task",
            body: JSON.stringify(task)
        });
    }
};