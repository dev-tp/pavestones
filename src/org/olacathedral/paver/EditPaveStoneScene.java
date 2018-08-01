package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

class EditPaveStoneScene extends CustomScene {

    private boolean editMode;
    private BorderPane container;
    private CustomScene previousScene;
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

        map = editMode ? new MapPane(paveStone) : new MapPane();

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
        button.setOnAction(event -> previousScene.show());
        HBox.setMargin(button, margin10Right);

        Button cancelButton = new Button("Cancel");
        cancelButton.setMinWidth(100);
        cancelButton.setOnAction(event -> previousScene.show());

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

        HBox coordinatesWrapper = new HBox();

        Label[] labels = new Label[2];
        labels[0] = new Label();
        labels[0].setText("x: ");

        labels[1] = new Label();
        labels[1].setText("y: ");

        Label xLabel = new Label(paveStone.getX() == -1 ? "-" : paveStone.getX() + "");
        xLabel.setMinWidth(100);

        Label yLabel = new Label(paveStone.getY() == -1 ? "-" : paveStone.getY() + "");
        yLabel.setMinWidth(100);

        coordinatesWrapper.setAlignment(Pos.CENTER);
        commentSectionWrapper.setPadding(new Insets(0, 0, 10, 0));
        coordinatesWrapper.getChildren().addAll(labels[0], xLabel, labels[1], yLabel);

        bottomView.getChildren().addAll(inputFields, commentSectionWrapper, coordinatesWrapper);

        container.setBottom(bottomView);
        container.requestFocus();
    }
}
