package com.example.demo.classes.bottlesort;

import org.springframework.stereotype.Component;

@Component("bottlesortStage")
public class Stage {
	
	private String name;
	private Bottle[] bottles;
	
	public Stage() {}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Bottle[] getBottles() {
		Bottle[] bottlesCopy = new Bottle[bottles.length];
		for(int i = 0; i < bottles.length; i++) bottlesCopy[i] = new Bottle(bottles[i]);
		return bottlesCopy;
	}
	
	public void setBottles(Bottle[] bottles) {
		this.bottles = bottles;
	}
	
}
