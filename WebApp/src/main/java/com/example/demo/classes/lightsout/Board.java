package com.example.demo.classes.lightsout;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component("lightsoutBoard")
public class Board {

    private boolean[][] tiles;
    private int stage;
    private ArrayList<Stage> stages = new ArrayList<>();

    public Board() {
        tiles = new boolean[0][0];
        stage = 0;
    }

    @PostConstruct
    private void loadStages() {
        try (InputStream input = Board.class.getResourceAsStream("/static/lightsoutStages.json")) {
            if (input == null) {
                // resource not found — keep stages empty and avoid throwing in ctor/postconstruct
                System.err.println("lightsoutStages.json not found on classpath (/static/lightsoutStages.json)");
                return;
            }

            String jsonText = new String(input.readAllBytes(), StandardCharsets.UTF_8);

            Gson gson = new Gson();
            JsonObject root = JsonParser.parseString(jsonText).getAsJsonObject();
            JsonArray data = root.getAsJsonArray("data");
            if (data != null) {
                for (JsonElement el : data) {
                    Stage s = gson.fromJson(el, Stage.class);
                    if (s != null) stages.add(s);
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

    public boolean[][] getTiles() {
        return tiles;
    }

    private void toggleTile(int row, int col) {
        tiles[row][col] = !tiles[row][col];
    }

    public void nextStage() {
        levelUp();
        initStage();
    }

    private void initStage() {
        if (stages.isEmpty()) {
            tiles = new boolean[0][0];
            return;
        }

        boolean[][] temp = stages.get(stage).getTiles();
        if (temp == null || temp.length == 0 || temp[0].length == 0) {
            tiles = new boolean[0][0];
            return;
        }

        tiles = new boolean[temp.length][temp[0].length];
        for (int i = 0; i < temp.length; i++) {
            for (int j = 0; j < temp[i].length; j++) {
                tiles[i][j] = temp[i][j];
            }
        }
    }

    private void levelUp() {
        if (stages.isEmpty()) return;
        stage++;
        stage = stage % stages.size();
    }

    public void clicked(int id) {
        int rows = tiles.length;
        int cols = (rows == 0) ? 0 : tiles[0].length;
        if (cols == 0) return;

        int row = id / cols;
        int col = id % cols;

        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                int r = row + dr;
                int c = col + dc;
                if (r >= 0 && r < rows && c >= 0 && c < cols) {
                    toggleTile(r, c);
                }
            }
        }
    }

    public boolean checkWin() {
        for (boolean[] b1 : tiles) {
            for (boolean b2 : b1) {
                if (!b2) return false;
            }
        }
        return true;
    }
}