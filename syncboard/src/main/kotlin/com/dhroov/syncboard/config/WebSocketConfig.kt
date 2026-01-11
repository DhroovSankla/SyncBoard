package com.dhroov.syncboard.config

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.*

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {

    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        // Messages from server to client go through /topic
        config.enableSimpleBroker("/topic")
        // Messages from client to server start with /app
        config.setApplicationDestinationPrefixes("/app")
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        // The URL the React frontend will use to connect
        registry.addEndpoint("/ws-board")
            .setAllowedOriginPatterns("*") // Crucial for local development
            .withSockJS()
    }
}