package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Paint;

public class CustomListCell extends ListCell<Donor> {

    private Label coordinateLabel;
    private Label donorInfoLabel;
    private Label editLabel;
    private Label deleteLabel;
    private HBox container;

    CustomListCell() {
        super();

        container = new HBox();

        VBox donorInfoContainer = new VBox();
        donorInfoContainer.setPadding(new Insets(0, 0, 0, 10));

        donorInfoLabel = new Label();
        donorInfoLabel.setStyle("-fx-font-weight: bold");
        coordinateLabel = new Label();

        donorInfoContainer.getChildren().addAll(donorInfoLabel, coordinateLabel);

        container.getChildren().add(donorInfoContainer);

        Pane spacer = new Pane();
        HBox.setHgrow(spacer, Priority.ALWAYS);

        container.getChildren().add(spacer);

        // Only display this in admin mode
        editLabel = new Label("Edit");
        deleteLabel = new Label("Delete");
        deleteLabel.setTextFill(Paint.valueOf("#f00"));
        deleteLabel.setPadding(new Insets(2, 0, 0, 0));

        VBox editContainer = new VBox();
        editContainer.setAlignment(Pos.CENTER_LEFT);
        editContainer.getChildren().addAll(editLabel, deleteLabel);

        container.getChildren().add(editContainer);
    }

    @Override
    public void updateItem(Donor donor, boolean empty) {
        super.updateItem(donor, empty);

        if (!empty) {
            String alias = donor.getAlias();
            donorInfoLabel.setText(donor.getFullName() + (alias.equals("") ? "" : " (" + alias + ")"));
            coordinateLabel.setText("x: " + donor.getX() + ", y: " + donor.getY());
            editLabel.setOnMouseClicked(event -> System.out.println("Edit: " + donor.getId()));
            deleteLabel.setOnMouseClicked(event -> System.out.println("Delete: " + donor.getId()));
            setGraphic(container);
        }
    }
}
