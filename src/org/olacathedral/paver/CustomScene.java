package org.olacathedral.paver;

import javafx.geometry.Rectangle2D;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Screen;
import javafx.stage.Stage;

public abstract class CustomScene extends Scene {

    private int minHeight;
    private int minWidth;
    private Stage stage;
    private String title;

    CustomScene(Parent parent, Stage stage, String title, int minWidth, int minHeight) {
        super(parent, minWidth, minHeight);

        this.minHeight = minHeight;
        this.minWidth = minWidth;
        this.stage = stage;
        this.title = title;
    }

    protected abstract void load();

    void centerStage() {
        Rectangle2D screenBounds = Screen.getPrimary().getVisualBounds();

        stage.setX((screenBounds.getWidth() - stage.getWidth()) / 2);
        stage.setY((screenBounds.getHeight() - stage.getHeight()) / 2);
    }

    Stage getStage() {
        return stage;
    }

    void show() {
        stage.setScene(this);
        stage.setMinWidth(minWidth);
        stage.setMinHeight(minHeight);
        stage.setTitle(title);
        stage.show();
    }
}
