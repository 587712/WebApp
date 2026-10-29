package com.example.demo.classes.mastermind;

public class Feedback {
	
	private FeedbackValues[] result;
	
	public Feedback() {
		
		result = new FeedbackValues[4];
		for(int i = 0; i < 4; i++) {
			result[i] = FeedbackValues.BLANK;
		}
		
	}
	
	public FeedbackValues[] getResult() {
		return result;
	}
	
	public void setValues(int w, int b) {
		for(int i = 0; i < 4; i++) {
			if(w > 0) {
				result[i] = FeedbackValues.CORRECT;
				w--;
			}
			else if(b > 0) {
				result[i] = FeedbackValues.PARTIAL;
				b--;
			}
			else result[i] = FeedbackValues.INCORRECT;
		}
	}
	
	public void addValue(FeedbackValues val) {
		
		for(int i = 0; i < result.length; i++) {
			if(result[i] == null) {
				result[i] = val;
				break;
			}
		}
		
	}
	
}
