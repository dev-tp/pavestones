package org.olacathedral.paver;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Control;
import javafx.scene.control.ListView;
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

        ObservableList<Donor> observableList = FXCollections.observableArrayList(
                new Donor(1, "Person 1", "Cathedral", 0, 0),
                new Donor(2, "Person 2", "", 10, 10),
                new Donor(3, "Person 3", "", 20, 20)
        );
        ListView<Donor> listView = new ListView<>(observableList);
        listView.setCellFactory((item) -> new CustomListCell());

        StackPane.setMargin(listView, new Insets(60, 80, 80, 80));

        container.getChildren().add(listView);
    }
}
