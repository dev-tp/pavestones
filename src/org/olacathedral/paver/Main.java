package org.olacathedral.paver;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

import java.io.File;

public class Main extends Application {

    private Circle marker;

    @Override
    public void start(Stage stage) {
        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();

        ImageView background = new ImageView(currentPath + "resources/images/Cathedral.png");

        Pane container = new Pane();
        container.setPrefSize(background.getImage().getWidth(), background.getImage().getHeight());
        container.getChildren().add(background);
        container.setOnMouseClicked(event -> {
            if (event.getButton() == MouseButton.PRIMARY) {
                container.getChildren().remove(marker);

                marker = new Circle(event.getX(), event.getY(), 2);
                marker.setFill(Color.valueOf("#13437b"));

                container.getChildren().add(marker);
            }
        });

        try {
            Database database = new Database();

            for (Integer[] coordinate : database.getAllCoordinates()) {
                Circle circle = new Circle(coordinate[0], coordinate[1], 2);
                circle.setFill(Color.valueOf("#becada"));
                container.getChildren().add(circle);
            }

        } catch (Exception exception) {
            exception.printStackTrace();
        }

        ZoomableScrollPane scrollPane = new ZoomableScrollPane(container);

        stage.setScene(new Scene(scrollPane, 800, 600));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
