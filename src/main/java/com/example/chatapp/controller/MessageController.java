package com.example.chatapp.controller;


import com.example.chatapp.model.MessageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Controller;

@Controller

public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/to")
    public void sendMessage(@DestinationVariable String to, MessageModel message ) {

        simpMessagingTemplate.convertAndSend("/topic/subscriber", message);
    }

}
