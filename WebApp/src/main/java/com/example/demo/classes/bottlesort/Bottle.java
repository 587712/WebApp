package com.example.demo.classes.bottlesort;

import org.springframework.stereotype.Component;

@Component
public class Bottle {
	
	private ColorEnum[] contents;
	
	public Bottle() {}
	
	public Bottle(ColorEnum[] contents) {
		this.contents = contents;
	}
	
	public Bottle(Bottle other) {
		ColorEnum[] ce = new ColorEnum[other.getContents().length];
		for(int i = 0; i < other.getContents().length; i++) ce[i] = other.getContents()[i];
		this.contents = ce;
	}
	
	public ColorEnum[] getContents() {
		return contents;
	}
	
	public ColorEnum getTopColor() {
		for(int i = contents.length - 1; i >= 0; i--) {
			if(contents[i] != null && contents[i] != ColorEnum.EMPTY) return contents[i];
		}
		return ColorEnum.EMPTY;
	}
	
	public int removeColor() {
		int amount = 0;
		 ColorEnum topColor = getTopColor();
		 for(int i = contents.length - 1; i >= 0; i--) {
			 if(contents[i] == null || contents[i] == ColorEnum.EMPTY) continue;
			 else if (contents[i] == topColor) {
				 contents[i] = ColorEnum.EMPTY;
				 amount++;
			 }
			 else break;
		 }
		 return amount;
	}
	
	public boolean addColor(ColorEnum newColor) {
		for(int i = 0; i < contents.length; i++) {
			if(contents[i] == null || contents[i] == ColorEnum.EMPTY) {
				try {
					contents[i] = newColor;
					return true;
				} catch(Exception e) {
					return false;
				}
			}
		}
		return false;
	}
	
	public boolean done() {
		ColorEnum color = contents[0];
		for(ColorEnum c : contents) {
			if(color != c) return false;
		}
		return true;
	}
	
}
