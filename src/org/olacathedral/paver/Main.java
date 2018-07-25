package org.olacathedral.paver;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

import java.io.File;

public class Main extends Application {

    @Override
    public void start(Stage stage) {
        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();

        ImageView background = new ImageView(currentPath + "resources/images/Motherlessboard.png");
        ZoomableScrollPane scrollPane = new ZoomableScrollPane(background);

        stage.setScene(new Scene(scrollPane, 800, 600));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
