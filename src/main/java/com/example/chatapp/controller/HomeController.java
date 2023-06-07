package com.example.chatapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
    @RequestMapping(value = "/chat-app", method = RequestMethod.GET)
    public ModelAndView home() {

        ModelAndView modelAndView = new ModelAndView("view");

        return modelAndView;
    }
}
