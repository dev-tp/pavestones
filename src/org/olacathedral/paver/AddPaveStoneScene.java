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

public class AddPaveStoneScene extends CustomScene {

    private BorderPane container;
    private CustomScene previousScene;

    AddPaveStoneScene(Stage stage, CustomScene previousScene) {
        super(new BorderPane(), stage, "Add New Entry", 1280, 720);

        container = (BorderPane) getRoot();
        this.previousScene = previousScene;

        load();
    }

    @Override
    protected void load() {
        Pane map = new Pane();
        map.setStyle("-fx-background-color: #000");

        container.setCenter(map);

        VBox bottomView = new VBox();
        bottomView.setPadding(new Insets(0, 0, 10, 0));

        HBox inputFields = new HBox();
        Insets margin10Right = new Insets(0, 10, 0, 0);

        TextField donorTextField = new TextField();
        donorTextField.setPromptText("Donor Name or Organization");
        donorTextField.setMinWidth(300);
        HBox.setMargin(donorTextField, margin10Right);

        TextField dedicatedToField = new TextField();
        dedicatedToField.setPromptText("Dedicated To");
        dedicatedToField.setMinWidth(300);
        HBox.setMargin(dedicatedToField, margin10Right);

        Button addButton = new Button("Add");
        addButton.setMinWidth(100);
        addButton.setOnAction(event -> previousScene.show());
        HBox.setMargin(addButton, margin10Right);

        Button cancelButton = new Button("Cancel");
        cancelButton.setMinWidth(100);
        cancelButton.setOnAction(event -> previousScene.show());

        inputFields.setAlignment(Pos.CENTER);
        inputFields.setPadding(new Insets(10, 0, 10, 0));
        inputFields.getChildren().addAll(donorTextField, dedicatedToField, addButton, cancelButton);

        HBox commentSectionWrapper = new HBox();
        commentSectionWrapper.setAlignment(Pos.CENTER);

        TextArea commentSection = new TextArea();
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

        Label xLabel = new Label("-");
        xLabel.setMinWidth(100);

        Label yLabel = new Label("-");
        yLabel.setMinWidth(100);

        coordinatesWrapper.setAlignment(Pos.CENTER);
        commentSectionWrapper.setPadding(new Insets(0, 0, 10, 0));
        coordinatesWrapper.getChildren().addAll(labels[0], xLabel, labels[1], yLabel);

        bottomView.getChildren().addAll(inputFields, commentSectionWrapper, coordinatesWrapper);

        container.setBottom(bottomView);
        container.requestFocus();
    }
}
