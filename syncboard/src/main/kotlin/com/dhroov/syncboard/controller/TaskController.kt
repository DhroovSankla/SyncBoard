package com.dhroov.syncboard.controller

import com.dhroov.syncboard.model.BoardTask
import com.dhroov.syncboard.service.TaskService
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
class TaskController(private val taskService: TaskService) {

    // 1. Regular REST endpoint to get all tasks on page load
    @GetMapping("/api/tasks")
    @ResponseBody
    fun getAllTasks(): List<BoardTask> = taskService.getAllTasks()

    // 2. WebSocket endpoint: When a user moves a task
    @MessageMapping("/move-task")
    @SendTo("/topic/updates")
    fun handleTaskMove(task: BoardTask): BoardTask {
        // Save the new coordinates to the database
        return taskService.saveTask(task)
    }
}