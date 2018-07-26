package org.olacathedral.paver;

import javafx.application.Application;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Screen;
import javafx.stage.Stage;

public class Main extends Application {

    private static void centerStage(Stage stage) {
        Rectangle2D screenBounds = Screen.getPrimary().getVisualBounds();

        stage.setX((screenBounds.getWidth() - stage.getWidth()) / 2);
        stage.setY((screenBounds.getHeight() - stage.getHeight()) / 2);
    }

    @Override
    public void start(Stage stage) {
        LoginScene loginScene = new LoginScene();

        loginScene.getLoginButton().setOnAction(event -> {
            stage.setScene(new Scene(new Pane(), 1280, 720));
            stage.setTitle("Cathedral Map");
            stage.setMinWidth(1280);
            stage.setMinHeight(720);

            centerStage(stage);

            stage.show();
        });

        stage.setScene(loginScene);
        stage.setTitle("Login");
        stage.setMinWidth(480);
        stage.setMinHeight(720);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
