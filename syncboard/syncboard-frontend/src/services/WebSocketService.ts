import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Task } from '../types/Task';

let stompClient: Client | null = null;

export const connectWebSocket = (
  onTaskReceived: (task: Task) => void,
  onConnectionChange?: (connected: boolean) => void
) => {
  const socketUrl = process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws-board';

  stompClient = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('[STOMP] Connected to WebSocket endpoint');
      if (onConnectionChange) onConnectionChange(true);
      stompClient?.subscribe('/topic/updates', (message) => {
        try {
          const task: Task = JSON.parse(message.body);
          onTaskReceived(task);
        } catch (e) {
          console.error('[STOMP] Failed to parse message body', e);
        }
      });
    },
    onDisconnect: () => {
      console.log('[STOMP] Disconnected');
      if (onConnectionChange) onConnectionChange(false);
    },
    onStompError: (frame) => {
      console.error('[STOMP Error]', frame.headers['message'], frame.body);
    },
  });

  stompClient.activate();

  return () => {
    if (stompClient) {
      stompClient.deactivate();
      if (onConnectionChange) onConnectionChange(false);
    }
  };
};

export const sendTaskMove = (task: Task) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/move-task',
      body: JSON.stringify(task),
    });
  }
};

export const sendTaskUpdate = (task: Task) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/update-task',
      body: JSON.stringify(task),
    });
  }
};
