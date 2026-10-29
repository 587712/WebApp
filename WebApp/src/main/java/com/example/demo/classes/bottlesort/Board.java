package com.example.demo.classes.bottlesort;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.annotation.PostConstruct;

@Component("bottlesortBoard")
public class Board {
	
	private Bottle[] bottles;
	private int curStage;
	private ArrayList<Stage> stages = new ArrayList<>();
	
	public Board() {
		bottles = new Bottle[0];
		curStage = 0;
	}
	
	public Bottle[] getBottles() {
		return bottles;
	}
	
	@PostConstruct
    private void loadStages() {
        try (InputStream input = Board.class.getResourceAsStream("/static/bottlesortStages.json")) {
            if (input == null) {
                // resource not found — keep stages empty and avoid throwing in ctor/postconstruct
                System.err.println("bottlesortStages.json not found on classpath (/static/bottlesortStages.json)");
                return;
            }
            
            String jsonText = new String(input.readAllBytes(), StandardCharsets.UTF_8);
            
            JsonObject root = JsonParser.parseString(jsonText).getAsJsonObject();
            JsonArray data = root.getAsJsonArray("data");
            if (data != null) {
                for (JsonElement stageData : data) {
                	JsonObject stage = (JsonObject) stageData.getAsJsonObject();
                	String stageName = stage.get("name").getAsString();
                	JsonArray stageBottles = stage.get("bottles").getAsJsonArray();
                	Bottle[] newBottles = new Bottle[stageBottles.size()];
                	for(int i = 0; i < stageBottles.size(); i++) {
                		ColorEnum[] ce = new ColorEnum[stageBottles.get(i).getAsJsonArray().size()];
                		for(int j = 0; j < stageBottles.get(i).getAsJsonArray().size(); j++) {
                			ce[j] = ColorEnum.valueOf(stageBottles.get(i).getAsJsonArray().get(j).getAsString());
                		}
                		newBottles[i] = new Bottle(ce);
                	}
                	Stage newStage = new Stage();
                	newStage.setName(stageName);
                	newStage.setBottles(newBottles);
                	stages.add(newStage);
                }
            }
        } catch (Exception e) {
            // log and continue — do not fail bean instantiation
            e.printStackTrace();
        }
        
        if (!stages.isEmpty()) {
            initStage();
        }
    }
	
	public void nextStage() {
		levelUp();
		initStage();
	}
	
	private void levelUp() {
		if (stages.isEmpty()) return;
        curStage++;
        curStage = curStage % stages.size();
        initStage();
	}
	
	private void initStage() {
		bottles = stages.get(curStage).getBottles().clone();
    }
	
	public void swapLiquid(int from, int to) {
		ColorEnum color = bottles[from].getTopColor();
		int amount = bottles[from].removeColor();
		while(amount > 0) {
			if(bottles[to].addColor(color)) amount--;
			else {
				bottles[from].addColor(color);
				amount--;
			}
		}
	}
	
	public boolean checkWin() {
		for(Bottle b : bottles) {
			if(!b.done()) return false;
		}
		return true;
	}
	
}
