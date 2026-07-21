package com.dhroov.syncboard.repository;

import com.dhroov.syncboard.model.BoardTask;
import com.dhroov.syncboard.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<BoardTask, Long> {
    List<BoardTask> findByStatus(TaskStatus status);
}
