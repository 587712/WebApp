package com.example.demo.classes.lightsout;

import org.springframework.stereotype.Component;

@Component("lightsoutStage")
public class Stage {

	private String name;
	private boolean[][] tiles;
	
	public Stage() {}
	
	public Stage(String name, boolean[][] tiles) {
		this.name = name;
		this.tiles = tiles;
	}

	public String getName() {
		return name;
	}

	public boolean[][] getTiles() {
		return tiles;
	}

}
