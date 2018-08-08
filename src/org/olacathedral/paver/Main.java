package org.olacathedral.paver;

import javafx.application.Application;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.File;

public class Main extends Application {

    static Database database;

    @Override
    public void init() {
        database = new Database();
        database.getAllPaveStones();
    }

    @Override
    public void start(Stage stage) {
        String iconsDir = new File(System.getProperty("user.dir")).toURI().toString() + "resources/icons/";

        stage.getIcons().add(new Image(iconsDir + "icon.png"));

        LoginScene loginScene = new LoginScene(stage);
        loginScene.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
