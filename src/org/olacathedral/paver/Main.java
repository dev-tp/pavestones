package org.olacathedral.paver;

import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage stage) {
        LoginScene loginScene = new LoginScene(stage);
        loginScene.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
