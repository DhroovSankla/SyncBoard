package com.dhroov.syncboard.repository

import com.dhroov.syncboard.model.BoardTask
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskRepository : JpaRepository<BoardTask, Long>