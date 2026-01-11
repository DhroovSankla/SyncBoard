package com.dhroov.syncboard.model

import jakarta.persistence.*

@Entity
@Table(name = "tasks")
class BoardTask(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var title: String,
    var description: String,

    // Position on the board (for real-time sync)
    var xCoordinate: Double = 0.0,
    var yCoordinate: Double = 0.0,

    var status: String = "TODO" // TODO, IN_PROGRESS, DONE
)