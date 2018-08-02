package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;

class EditPaveStoneScene extends CustomScene {

    private boolean editMode;
    private BorderPane container;
    private CustomScene previousScene;
    private Label xLabel;
    private Label yLabel;
    private PaveStone backup;
    private PaveStone paveStone;
    private MapPane map;

    EditPaveStoneScene(Stage stage, CustomScene previousScene, PaveStone paveStone) {
        this(stage, previousScene, paveStone, false);
    }

    EditPaveStoneScene(Stage stage, CustomScene previousScene, PaveStone paveStone, boolean editMode) {
        super(new BorderPane(), stage, editMode ? "Edit " + paveStone.getDedicatedTo() : "Create New Entry", 1280, 720);

        container = (BorderPane) getRoot();
        this.editMode = editMode;
        this.paveStone = paveStone;
        this.previousScene = previousScene;

        backup = new PaveStone(paveStone);
        map = new MapPane(paveStone);

        load();
    }

    void fitMap() {
        map.setToFit();
        map.setVvalue(0.05);
    }

    void focusOnPaveStone() {
        map.focusOnPaveStone(paveStone);
    }

    @Override
    protected void load() {
        for (PaveStone paveStone : Main.database.getAllPaveStones()) {
            if (this.paveStone != paveStone) {
                Circle marker = new Circle(paveStone.getX(), paveStone.getY(), 2.0);
                marker.setFill(Paint.valueOf("#becada"));

                Tooltip.install(marker, new Tooltip(paveStone.getDedicatedTo()));

                map.getBackgroundPane().getChildren().add(marker);
            }
        }

        container.setCenter(map);

        VBox bottomView = new VBox();
        bottomView.setPadding(new Insets(0, 0, 10, 0));

        HBox inputFields = new HBox();
        Insets margin10Right = new Insets(0, 10, 0, 0);

        TextField donorTextField = new TextField(paveStone.getDonor());
        donorTextField.setPromptText("Donor Name or Organization");
        donorTextField.setMinWidth(300);
        HBox.setMargin(donorTextField, margin10Right);

        TextField dedicatedToField = new TextField(paveStone.getDedicatedTo());
        dedicatedToField.setPromptText("Dedicated To");
        dedicatedToField.setMinWidth(300);
        HBox.setMargin(dedicatedToField, margin10Right);

        Button button = new Button(editMode ? "Update" : "Add");
        button.setMinWidth(100);
        HBox.setMargin(button, margin10Right);

        Button cancelButton = new Button("Cancel");
        cancelButton.setMinWidth(100);
        cancelButton.setOnAction(event -> {
            paveStone.setDonor(backup.getDonor());
            paveStone.setDedicatedTo(backup.getDedicatedTo());
            paveStone.setX(backup.getX());
            paveStone.setY(backup.getY());

            previousScene.show();
        });

        inputFields.setAlignment(Pos.CENTER);
        inputFields.setPadding(new Insets(10, 0, 10, 0));
        inputFields.getChildren().addAll(donorTextField, dedicatedToField, button, cancelButton);

        HBox commentSectionWrapper = new HBox();
        commentSectionWrapper.setAlignment(Pos.CENTER);

        TextArea commentSection = new TextArea(paveStone.getComments());
        commentSection.setPromptText("Comments");
        commentSection.setPrefHeight(50);
        commentSection.setPrefWidth(830);
        commentSectionWrapper.getChildren().add(commentSection);

        button.setOnAction(event -> {
            paveStone.setDonor(donorTextField.getText());

            if (paveStone.getDonor().equals("")) {
                donorTextField.requestFocus();
                return;
            }

            paveStone.setDedicatedTo(dedicatedToField.getText());

            if (paveStone.getDedicatedTo().equals("")) {
                dedicatedToField.requestFocus();
                return;
            }

            try {
                paveStone.setX(Double.parseDouble(xLabel.getText()));
                paveStone.setY(Double.parseDouble(yLabel.getText()));
            } catch (NumberFormatException exception) {
                return;
            }

            paveStone.setComments(commentSection.getText());

            if (editMode) {
                Main.database.updatePaveStone(paveStone);
            } else {
                Main.database.addPaveStone(paveStone);
            }

            previousScene.show();
        });

        HBox coordinatesWrapper = new HBox();

        Label[] labels = new Label[2];
        labels[0] = new Label();
        labels[0].setText("x: ");

        labels[1] = new Label();
        labels[1].setText("y: ");

        xLabel = new Label(paveStone.getX() == -1 ? "-" : (int) paveStone.getX() + "");
        xLabel.setMinWidth(100);

        yLabel = new Label(paveStone.getY() == -1 ? "-" : (int) paveStone.getY() + "");
        yLabel.setMinWidth(100);

        coordinatesWrapper.setAlignment(Pos.CENTER);
        commentSectionWrapper.setPadding(new Insets(0, 0, 10, 0));
        coordinatesWrapper.getChildren().addAll(labels[0], xLabel, labels[1], yLabel);

        bottomView.getChildren().addAll(inputFields, commentSectionWrapper, coordinatesWrapper);

        container.setBottom(bottomView);
        container.requestFocus();
    }

    void updateCoordinateLabels() {
        xLabel.setText("" + (int) paveStone.getX());
        yLabel.setText("" + (int) paveStone.getY());
    }
}
