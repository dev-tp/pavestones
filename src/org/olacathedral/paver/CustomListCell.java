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

public class CustomListCell extends ListCell<PaveStone> {

    private Label coordinateLabel;
    private Label infoLabel;
    private Label editLabel;
    private Label deleteLabel;
    private HBox container;

    CustomListCell() {
        super();

        container = new HBox();

        VBox donorInfoWrapper = new VBox();
        donorInfoWrapper.setPadding(new Insets(0, 0, 0, 10));

        infoLabel = new Label();
        infoLabel.setStyle("-fx-font-weight: bold");
        coordinateLabel = new Label();

        donorInfoWrapper.getChildren().addAll(infoLabel, coordinateLabel);

        container.getChildren().add(donorInfoWrapper);

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
    public void updateItem(PaveStone paveStone, boolean empty) {
        super.updateItem(paveStone, empty);

        if (!empty) {
            String donor = paveStone.getDonor();
            infoLabel.setText(paveStone.getDedicatedTo() + (donor.equals("") ? "" : " (" + donor + ")"));
            coordinateLabel.setText("x: " + paveStone.getX() + ", y: " + paveStone.getY());
            editLabel.setOnMouseClicked(event -> System.out.println("Edit: " + paveStone.getId()));
            deleteLabel.setOnMouseClicked(event -> System.out.println("Delete: " + paveStone.getId()));
            setGraphic(container);
        }
    }
}
