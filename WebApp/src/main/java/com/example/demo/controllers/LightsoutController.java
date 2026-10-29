package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.classes.lightsout.Board;

@Controller
@RequestMapping("/lightsout")
public class LightsoutController {
	
	private final Board board;
	
	public LightsoutController(Board board) {
		this.board = board;
	}
	
	@GetMapping("/play")
	public String init() {
		return "lightsoutView";
	}
	
	@GetMapping("/data")
	@ResponseBody
	public boolean[][] receiveData() {
		return board.getTiles();
	}
	
	@PostMapping("/click")
	@ResponseBody
	public Map<String, Object> clicked(@RequestBody int id) {
		board.clicked(id);
		Map<String, Object> response = new HashMap<>();
		response.put("victory", board.checkWin());
		response.put("tiles", board.getTiles());
		return response;
	}
	
	@GetMapping("/nextLevel")
	@ResponseBody
	public boolean nextLevel() {
		if(board.checkWin()) {
			board.nextStage();
			return true;
		}
		return false;
	}
	
}
