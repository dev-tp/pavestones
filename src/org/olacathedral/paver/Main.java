package org.olacathedral.paver;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.Pane;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

import java.io.File;

public class Main extends Application {

    @Override
    public void start(Stage stage) {
        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();

        ImageView background = new ImageView(currentPath + "resources/images/Motherlessboard.png");

        Pane container = new Pane();
        container.setPrefSize(background.getImage().getWidth(), background.getImage().getHeight());
        container.getChildren().add(background);
        container.setOnMouseClicked(event -> {
            if (event.getButton() == MouseButton.PRIMARY) {
                container.getChildren().add(new Circle(event.getX(), event.getY(), 10));
            }
        });

        ZoomableScrollPane scrollPane = new ZoomableScrollPane(container);

        stage.setScene(new Scene(scrollPane, 800, 600));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
