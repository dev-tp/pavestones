package org.olacathedral.paver;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;

class SearchScene extends CustomScene {

    private BorderPane container;

    SearchScene(Stage stage) {
        super(new BorderPane(), stage, "Search for Pave Stone", 1280, 720);
        container = (BorderPane) getRoot();
        load();
    }

    @Override
    protected void load() {
        HBox searchContainer = new HBox();
        searchContainer.setAlignment(Pos.CENTER);
        searchContainer.setPadding(new Insets(10, 0, 10, 0));

        TextField searchTextField = new TextField();
        searchTextField.setMinWidth(300);
        searchTextField.setOnAction(event -> System.out.println(searchTextField.getText()));
        HBox.setMargin(searchTextField, new Insets(0, 10, 0, 0));

        Button searchButton = new Button("Search");
        searchButton.setMinWidth(100);
        searchButton.setOnAction(event -> System.out.println(searchTextField.getText()));

        searchContainer.getChildren().addAll(searchTextField, searchButton);

        container.setTop(searchContainer);

        ObservableList<Donor> observableList = FXCollections.observableArrayList();
        ListView<Donor> listView = new ListView<>(observableList);
        listView.setCellFactory(cell -> new CustomListCell());

        container.setCenter(listView);

        HBox viewButtonContainer = new HBox();
        viewButtonContainer.setAlignment(Pos.CENTER);
        viewButtonContainer.setPadding(new Insets(10, 0, 10, 0));

        Button viewButton = new Button("View on Map");
        viewButton.setMinWidth(100);
        viewButton.setOnAction(event -> {
            Donor donor = listView.getSelectionModel().getSelectedItem();
            if (donor != null) {
                System.out.println(donor.getId());
            }
        });
        viewButtonContainer.getChildren().add(viewButton);

        container.setBottom(viewButtonContainer);
    }
}
