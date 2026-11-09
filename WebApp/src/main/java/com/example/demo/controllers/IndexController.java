package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping
public class IndexController {
	@GetMapping("/")
	public String init() {
		return "index";
	}
	
	@GetMapping("/setup")
	@ResponseBody
	public Map<String, Object> setUp() {
		Map<String, Object> response = new HashMap<>();
		response.put("style", getCSS());
		return response;
	}
	private String getCSS() {
		return "";
	}
}
