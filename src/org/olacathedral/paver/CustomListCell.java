package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Paint;
import javafx.stage.Stage;

class CustomListCell extends ListCell<PaveStone> {

    private CustomScene previousScene;
    private Label coordinateLabel;
    private Label infoLabel;
    private Label editLabel;
    private Label deleteLabel;
    private HBox container;
    private Stage stage;

    CustomListCell(Stage stage, CustomScene previousScene) {
        super();

        this.previousScene = previousScene;
        this.stage = stage;

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
            coordinateLabel.setText("x: " + (int) paveStone.getX() + ", y: " + (int) paveStone.getY());

            editLabel.setOnMouseClicked(event -> {
                EditPaveStoneScene scene = new EditPaveStoneScene(stage, previousScene, paveStone, true);
                scene.show();
                scene.focusOnPaveStone();
            });

            deleteLabel.setOnMouseClicked(event -> {
                Alert alert = new Alert(Alert.AlertType.WARNING);
                alert.getButtonTypes().remove(0);
                alert.getButtonTypes().add(new ButtonType("Yes", ButtonBar.ButtonData.OK_DONE));
                alert.getButtonTypes().add(new ButtonType("No", ButtonBar.ButtonData.CANCEL_CLOSE));
                alert.setHeaderText("You are about to delete an entry.");
                alert.setContentText("Are you sure you want to delete \"" + paveStone.getDedicatedTo() + "\"?");
                alert.showAndWait().ifPresent(buttonType -> {
                    if (buttonType.getButtonData() == ButtonBar.ButtonData.OK_DONE) {
                        System.out.println("Delete: " + paveStone.getId());
                    }
                });
            });

            container.setOnMouseClicked(event -> {
                if (event.getButton() == MouseButton.PRIMARY) {
                    if (event.getClickCount() == 2) {
                        CustomScene scene = new ResultScene(stage, previousScene, paveStone);
                        scene.show();
                    }
                }
            });

            setGraphic(container);
        }
    }
}
