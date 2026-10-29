package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.classes.bottlesort.Board;

@Controller
@RequestMapping("/bottlesort")
public class BottlesortController {
	
	private final Board board;
	
	public BottlesortController(Board board) {
		this.board = board;
	}
	
	@GetMapping("/play")
	public String init() {
		return "bottlesortView";
	}
	
	@GetMapping("/setup")
	@ResponseBody
	public Map<String, Object> setUp() {
		Map<String, Object> response = new HashMap<>();
		response.put("board", board);
		response.put("win", board.checkWin());
		return response;
	}
	
	@PostMapping("/update")
	@ResponseBody
	public Map<String, Object> update(@RequestBody Map<String, Integer> data) {
		if(data != null && data.get("from") != null && data.get("to") != null) board.swapLiquid(data.get("from"), data.get("to"));
		return setUp();
	}
	
	@GetMapping("/nextLevel")
	@ResponseBody
	public Map<String, Object> nextLevel() {
		if(board.checkWin()) board.nextStage();
		return setUp();
	}
	
}
