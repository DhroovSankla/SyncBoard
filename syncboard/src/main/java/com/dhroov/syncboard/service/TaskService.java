package com.dhroov.syncboard.service;

import com.dhroov.syncboard.model.BoardTask;
import com.dhroov.syncboard.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<BoardTask> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<BoardTask> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public BoardTask saveTask(BoardTask task) {
        return taskRepository.save(task);
    }

    public BoardTask updateTaskPosition(Long id, Double x, Double y) {
        BoardTask task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + id));
        task.setXCoordinate(x);
        task.setYCoordinate(y);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
