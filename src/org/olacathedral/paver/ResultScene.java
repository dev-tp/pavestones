package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

class ResultScene extends CustomScene {

    private BorderPane container;
    private CustomScene previousScene;

    ResultScene(Stage stage, CustomScene previousScene, int id) {
        super(new BorderPane(), stage, "Result");

        container = (BorderPane) getRoot();
        this.previousScene = previousScene;

        System.out.println(id);

        load();
    }

    @Override
    protected void load() {
        Pane map = new Pane();
        map.setStyle("-fx-background-color: #000");

        container.setCenter(map);

        HBox actionsContainer = new HBox();
        actionsContainer.setAlignment(Pos.CENTER);
        actionsContainer.setPadding(new Insets(10, 0, 10, 0));

        Button printButton = new Button("Print");
        printButton.setMinWidth(100);
        HBox.setMargin(printButton, new Insets(0, 10, 0, 0));

        Button goBackButton = new Button("Go Back");
        goBackButton.setMinWidth(100);
        goBackButton.setOnAction(event -> previousScene.show());

        actionsContainer.getChildren().addAll(printButton, goBackButton);

        container.setBottom(actionsContainer);
    }
}
