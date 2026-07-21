package com.dhroov.syncboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Messages sent to topics starting with /topic are routed to subscribers
        config.enableSimpleBroker("/topic");
        // Messages bound for handling methods start with /app
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-board")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        registry.addEndpoint("/ws-board")
                .setAllowedOriginPatterns("*");
    }
}
