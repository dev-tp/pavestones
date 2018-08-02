package org.olacathedral.paver;

import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    static Database database;

    @Override
    public void start(Stage stage) {
        database = new Database();

        LoginScene loginScene = new LoginScene(stage);
        loginScene.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
