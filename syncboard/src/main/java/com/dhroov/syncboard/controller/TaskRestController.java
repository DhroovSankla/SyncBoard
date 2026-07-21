package com.dhroov.syncboard.controller;

import com.dhroov.syncboard.model.BoardTask;
import com.dhroov.syncboard.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskRestController {

    private final TaskService taskService;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<List<BoardTask>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<BoardTask> createTask(@RequestBody BoardTask task) {
        BoardTask created = taskService.saveTask(task);
        messagingTemplate.convertAndSend("/topic/updates", created);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardTask> updateTask(@PathVariable Long id, @RequestBody BoardTask taskDetails) {
        taskDetails.setId(id);
        BoardTask updated = taskService.saveTask(taskDetails);
        messagingTemplate.convertAndSend("/topic/updates", updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        BoardTask deletedPayload = BoardTask.builder().id(id).title("DELETED").build();
        messagingTemplate.convertAndSend("/topic/updates", deletedPayload);
        return ResponseEntity.noContent().build();
    }
}
