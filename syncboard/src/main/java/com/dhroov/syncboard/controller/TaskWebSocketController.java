package com.dhroov.syncboard.controller;

import com.dhroov.syncboard.model.BoardTask;
import com.dhroov.syncboard.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class TaskWebSocketController {

    private final TaskService taskService;

    @MessageMapping("/move-task")
    @SendTo("/topic/updates")
    public BoardTask handleTaskMove(BoardTask task) {
        if (task.getId() != null) {
            BoardTask existing = taskService.getTaskById(task.getId()).orElse(null);
            if (existing != null) {
                existing.setXCoordinate(task.getXCoordinate());
                existing.setYCoordinate(task.getYCoordinate());
                if (task.getStatus() != null) {
                    existing.setStatus(task.getStatus());
                }
                return taskService.saveTask(existing);
            }
        }
        return taskService.saveTask(task);
    }

    @MessageMapping("/update-task")
    @SendTo("/topic/updates")
    public BoardTask handleTaskUpdate(BoardTask task) {
        return taskService.saveTask(task);
    }
}
