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

    private static ObservableList<PaveStone> observableList;

    private BorderPane container;

    SearchScene(Stage stage) {
        super(new BorderPane(), stage, "Search for Pave Stone");
        container = (BorderPane) getRoot();
        load();
    }

    @Override
    protected void load() {
        HBox searchContainer = new HBox();
        searchContainer.setAlignment(Pos.CENTER);
        searchContainer.setPadding(new Insets(10, 0, 10, 0));

        TextField searchTextField = new TextField();
        searchTextField.setPromptText("Search by name(s)");
        searchTextField.setMinWidth(300);
        searchTextField.setOnAction(event -> updateWithSearchResults(searchTextField.getText()));
        searchTextField.setOnKeyReleased(event -> {
            if (searchTextField.getText().length() == 0) {
                update();
            } /* else {
                updateWithSearchResults(searchTextField.getText());
            } */
        });
        HBox.setMargin(searchTextField, new Insets(0, 10, 0, 0));

        Button searchButton = new Button("Search");
        searchButton.setMinWidth(100);
        searchButton.setOnAction(event -> updateWithSearchResults(searchTextField.getText()));

        searchContainer.getChildren().addAll(searchTextField, searchButton);

        container.setTop(searchContainer);

        observableList = FXCollections.observableArrayList();
        observableList.setAll(Main.database.getAllPaveStones());

        ListView<PaveStone> listView = new ListView<>(observableList);
        listView.setCellFactory(cell -> new CustomListCell(getStage(), this));

        container.setCenter(listView);

        HBox actionsContainer = new HBox();
        actionsContainer.setAlignment(Pos.CENTER);
        actionsContainer.setPadding(new Insets(10, 0, 10, 0));

        Button viewButton = new Button("View on Map");
        viewButton.setMinWidth(100);
        viewButton.setOnAction(event -> {
            PaveStone paveStone = listView.getSelectionModel().getSelectedItem();
            if (paveStone != null) {
                CustomScene scene = new ResultScene(getStage(), this, paveStone);
                scene.show();
            }
        });
        HBox.setMargin(viewButton, new Insets(0, 10, 0, 0));

        actionsContainer.getChildren().add(viewButton);

        if (LoginScene.admin) {
            Button addNewPaveStoneButton = new Button("Add New");
            addNewPaveStoneButton.setMinWidth(100);
            addNewPaveStoneButton.setOnAction(event -> {
                EditPaveStoneScene scene = new EditPaveStoneScene(getStage(), this, new PaveStone());
                scene.show();
                scene.fitMap();
            });

            actionsContainer.getChildren().add(addNewPaveStoneButton);
        }

        container.setBottom(actionsContainer);
        container.requestFocus();
    }

    static void update() {
        observableList.clear();
        observableList.setAll(Main.database.getAllPaveStones());
    }

    private void updateWithSearchResults(String term) {
        observableList.clear();
        observableList.setAll(Main.database.search(term));
    }
}
