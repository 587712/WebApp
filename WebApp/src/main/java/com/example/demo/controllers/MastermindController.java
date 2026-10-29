package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.classes.mastermind.Board;
import com.example.demo.classes.mastermind.TileValue;

@Controller
@RequestMapping("/mastermind")
public class MastermindController {
	
	Board board = new Board();
	
	public MastermindController() {}
	
	@GetMapping("/play")
	public String init() {
		board = new Board();
		return "mastermindView";
	}
	
	@GetMapping("/colors")
	@ResponseBody
	public Map<String, Object> getColors() {
		Map<String, Object> response = new HashMap<>();
		response.put("colors", TileValue.values());
		return response;
	}
	
	@GetMapping("/data")
	@ResponseBody
	public Map<String, Object> receiveData() {
		Map<String, Object> response = new HashMap<>();
		response.put("tiles", board.getAttempts());
		response.put("feedback", board.getFeedback());
		response.put("victory", board.getVictory());
		return response;
	}
	
	@PostMapping("/click")
	@ResponseBody
	public Map<String, Object> clicked(@RequestBody String[] values) {
		board.addRow(values);
		return receiveData();
	}
	
	@PostMapping("/setCode")
	@ResponseBody
	public Map<String, Object> setCode(@RequestBody String[] values) {
		board.setCode(values);
		return receiveData();
	}
	
	@GetMapping("/rndCode")
	@ResponseBody
	public Map<String, Object> endCode() {
		board.rndCode();
		return receiveData();
	}
	
	@GetMapping("/reset")
	@ResponseBody
	public Map<String, Object> reset() {
		board = new Board();
		return getColors();
	}
	
}
