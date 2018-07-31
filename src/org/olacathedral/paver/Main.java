package org.olacathedral.paver;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage stage) {
        MapPane map = new MapPane();

        try {
            Database database = new Database();

            for (PaveStone paveStone : database.getAllPaveStones()) {
                Circle circle = new Circle(paveStone.getX(), paveStone.getY(), 2);
                circle.setFill(Color.valueOf("#becada"));
                map.getBackgroundPane().getChildren().add(circle);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        stage.setScene(new Scene(map, 800, 600));
        stage.show();

        map.setToFit();
        map.focusOnPaveStone(new PaveStone(
                0,
                "",
                "",
                (int) (map.getBackgroundPane().getWidth() / 2),
                (int) (map.getBackgroundPane().getHeight() / 2),
                "",
                null
        ));
    }

    public static void main(String[] args) {
        launch(args);
    }
}
