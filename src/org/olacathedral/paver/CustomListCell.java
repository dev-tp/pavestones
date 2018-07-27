package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.scene.control.Label;
import javafx.scene.control.ListCell;
import javafx.scene.layout.VBox;

public class CustomListCell extends ListCell<Donor> {

    private Label coordinateLabel;
    private Label donorInfoLabel;
    private VBox container;

    CustomListCell() {
        super();

        container = new VBox();
        container.setPadding(new Insets(0, 0, 0, 10));

        donorInfoLabel = new Label();
        donorInfoLabel.setStyle("-fx-font-weight: bold");
        coordinateLabel = new Label();

        container.getChildren().addAll(donorInfoLabel, coordinateLabel);
    }

    @Override
    public void updateItem(Donor donor, boolean empty) {
        super.updateItem(donor, empty);

        if (!empty) {
            String alias = donor.getAlias();
            donorInfoLabel.setText(donor.getFullName() + (alias.equals("") ? "" : " (" + alias + ")"));
            coordinateLabel.setText("x: " + donor.getX() + ", y: " + donor.getY());
            container.setOnMouseClicked(event -> System.out.println("Donor ID: " + donor.getId()));
            setGraphic(container);
        }
    }
}
