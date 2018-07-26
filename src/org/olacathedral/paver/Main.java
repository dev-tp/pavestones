package org.olacathedral.paver;

import javafx.application.Application;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.stage.Screen;
import javafx.stage.Stage;

public class Main extends Application {

    private static void centerStage(Stage stage) {
        Rectangle2D screenBounds = Screen.getPrimary().getVisualBounds();

        stage.setX((screenBounds.getWidth() - stage.getWidth()) / 2);
        stage.setY((screenBounds.getHeight() - stage.getHeight()) / 2);
    }

    private static void setStage(Stage stage, Scene scene, String title, int minWidth, int minHeight) {
        stage.setScene(scene);
        stage.setMinWidth(minWidth);
        stage.setMinHeight(minHeight);
        stage.setTitle(title);
        stage.show();
    }

    @Override
    public void start(Stage stage) {
        LoginScene loginScene = new LoginScene();

        loginScene.getLoginButton().setOnAction(event -> {
            setStage(stage, new MainScene(), "Paving Stones", 1280, 720);
            centerStage(stage);
        });

        setStage(stage, loginScene, "Login", 480, 720);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
