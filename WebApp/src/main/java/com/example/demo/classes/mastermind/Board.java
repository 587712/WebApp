package com.example.demo.classes.mastermind;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

@Component("mastermindBoard")
public class Board {
	
	private ArrayList<ArrayList<TileValue>> attempts;
	private ArrayList<ArrayList<FeedbackValues>> feedback;
	private ArrayList<TileValue> code;
	private boolean victory;
	
	public Board() {
		code = new ArrayList<>();
		attempts = new ArrayList<>();
		feedback = new ArrayList<>();
		
		victory = false;
	}
	
	public ArrayList<ArrayList<TileValue>> getAttempts() {
		return attempts;
	}
	public ArrayList<ArrayList<FeedbackValues>> getFeedback() {
		return feedback;
	}
	public boolean getVictory() {
		return victory;
	}
	
	public void setCode(String[] values) {
		if(code.isEmpty()) {
			for(String val : values) {
				code.add(TileValue.valueOf(val));
			}
		}
	}
	
	public void rndCode() {
		if(code.isEmpty()) {
			for(int i = 0; i < 4; i++) {
				int temp = (int) Math.floor(Math.random() * (TileValue.values().length - 1) + 1);
				code.add(TileValue.values()[temp]);
			}
		}
	}
	
	public void addRow(String[] values) {
		ArrayList<TileValue> row = new ArrayList<>();
		for(String val : values) {
			row.add(TileValue.valueOf(val));
		}
		attempts.add(row);
		compareRow(row);
	}
	
	private void compareRow(ArrayList<TileValue> vals) {
		ArrayList<FeedbackValues> fb = new ArrayList<>();
		ArrayList<TileValue> codeClone = new ArrayList<>();
		code.forEach(c -> codeClone.add(c));
		ArrayList<TileValue> valsClone = new ArrayList<>();
		vals.forEach(v -> valsClone.add(v));
		for(int i = 0; i < valsClone.size(); i++) {
			if(valsClone.get(i) == codeClone.get(i)) {
				fb.add(FeedbackValues.CORRECT);
				valsClone.remove(i);
				codeClone.remove(i);
				i--;
			}
		}
		while(valsClone.size() > 0) {
			fb.add(FeedbackValues.BLANK);
			for(int i = 0; i < codeClone.size(); i++) {
				if(valsClone.get(0) == codeClone.get(i)) {
					fb.set(fb.size() - 1, FeedbackValues.PARTIAL);
					break;
				}
			}
			fb.set(fb.size() - 1, compare(valsClone.get(0), codeClone));
			valsClone.remove(0);
		}
		if(!(fb.contains(FeedbackValues.INCORRECT) || fb.contains(FeedbackValues.PARTIAL))) victory = true;
		feedback.add(fb);
	}
	
	private FeedbackValues compare(TileValue val, ArrayList<TileValue> c) {
		if(c.contains(val)) return FeedbackValues.PARTIAL;
		else return FeedbackValues.INCORRECT;
	}
	
}
