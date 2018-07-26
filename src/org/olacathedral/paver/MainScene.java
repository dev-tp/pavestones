package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Control;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;

class MainScene extends Scene {

    private StackPane container;

    MainScene() {
        super(new StackPane(), 1280, 720);
        container = (StackPane) getRoot();
        load();
    }

    private void load() {
        Pane map = new Pane();
        map.setStyle("-fx-background-color: #000");

        container.getChildren().add(map);

        HBox searchContainer = new HBox();
        searchContainer.setAlignment(Pos.CENTER);
        searchContainer.setPadding(new Insets(10, 0, 10, 0));

        TextField searchTextField = new TextField();
        searchTextField.setMinWidth(300);
        HBox.setMargin(searchTextField, new Insets(0, 10, 0, 0));

        Button searchButton = new Button("Search");
        searchButton.setMinWidth(100);

        searchContainer.setPrefWidth(Control.USE_COMPUTED_SIZE);
        searchContainer.getChildren().addAll(searchTextField, searchButton);

        Group group = new Group();
        group.getChildren().add(searchContainer);

        VBox box = new VBox();
        box.setAlignment(Pos.TOP_CENTER);
        box.getChildren().add(group);

        container.getChildren().add(box);

        // Pane listView = new Pane();
        // listView.setStyle("-fx-background-color: #fff");
        // StackPane.setMargin(listView, new Insets(60, 80, 80, 80));

        // container.getChildren().add(listView);
    }
}
