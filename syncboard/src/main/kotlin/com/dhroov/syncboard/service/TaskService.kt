package com.dhroov.syncboard.service

import com.dhroov.syncboard.model.BoardTask
import com.dhroov.syncboard.repository.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService(private val taskRepository: TaskRepository) {
    fun getAllTasks(): List<BoardTask> = taskRepository.findAll()

    fun saveTask(task: BoardTask): BoardTask = taskRepository.save(task)
}