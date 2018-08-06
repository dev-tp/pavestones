package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.print.PageLayout;
import javafx.print.PrinterJob;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

class ResultScene extends CustomScene {

    private BorderPane container;
    private CustomScene previousScene;
    private PaveStone paveStone;

    ResultScene(Stage stage, CustomScene previousScene, PaveStone paveStone) {
        super(new BorderPane(), stage, paveStone.getDedicatedTo(), 1280, 720);

        container = (BorderPane) getRoot();
        this.paveStone = paveStone;
        this.previousScene = previousScene;

        load();
    }

    @Override
    protected void load() {
        container.setCenter(new StaticMapPane(paveStone, container.getWidth(), container.getHeight()));

        VBox bottomView = new VBox();
        bottomView.setPadding(new Insets(0, 0, 10, 0));

        HBox inputFields = new HBox();
        Insets margin10Right = new Insets(0, 10, 0, 0);

        Label donorLabel = new Label("Donor: " + paveStone.getDonor());
        donorLabel.setMinWidth(300);
        HBox.setMargin(donorLabel, margin10Right);

        Label dedicatedToField = new Label("Dedicated to: " + paveStone.getDedicatedTo());
        dedicatedToField.setMinWidth(300);
        HBox.setMargin(dedicatedToField, margin10Right);

        Button printButton = new Button("Print");
        printButton.setMinWidth(100);
        printButton.setOnAction(event -> {
            PrinterJob printerJob = PrinterJob.createPrinterJob();

            if (printerJob != null) {
                printerJob.getJobSettings().setJobName("Pave Stone for " + paveStone.getDedicatedTo());
                PageLayout pageLayout = printerJob.getJobSettings().getPageLayout();

                double printableWidth = pageLayout.getPrintableWidth();
                double printableHeight = pageLayout.getPrintableHeight();

                if (printerJob.printPage(new PrintoutTemplate(paveStone, printableWidth, printableHeight))) {
                    printerJob.endJob();
                } else {
                    System.err.println(printerJob.getJobStatus().toString());
                }
            } else {
                System.err.println("Could not create printer job.");
            }
        });
        HBox.setMargin(printButton, margin10Right);

        Button goBackButton = new Button("Go Back");
        goBackButton.setMinWidth(100);
        goBackButton.setOnAction(event -> previousScene.show());

        inputFields.setAlignment(Pos.CENTER);
        inputFields.setPadding(new Insets(10, 0, 10, 0));
        inputFields.getChildren().addAll(donorLabel, dedicatedToField, printButton, goBackButton);

        HBox commentSectionWrapper = new HBox();
        commentSectionWrapper.setAlignment(Pos.CENTER);

        ScrollPane commentSectionScrollPane = new ScrollPane();
        commentSectionScrollPane.setPrefHeight(50);
        commentSectionScrollPane.setPrefWidth(830);
        commentSectionScrollPane.setContent(new Label(paveStone.getComments()));
        commentSectionWrapper.getChildren().add(commentSectionScrollPane);

        HBox coordinatesWrapper = new HBox();

        Label[] labels = new Label[2];
        labels[0] = new Label();
        labels[0].setText("x: ");

        labels[1] = new Label();
        labels[1].setText("y: ");

        Label xLabel = new Label("" + (int) paveStone.getX());
        xLabel.setMinWidth(100);

        Label yLabel = new Label("" + (int) paveStone.getY());
        yLabel.setMinWidth(100);

        coordinatesWrapper.setAlignment(Pos.CENTER);
        commentSectionWrapper.setPadding(new Insets(0, 0, 10, 0));
        coordinatesWrapper.getChildren().addAll(labels[0], xLabel, labels[1], yLabel);

        bottomView.getChildren().addAll(inputFields, commentSectionWrapper, coordinatesWrapper);

        container.setBottom(bottomView);
        container.requestFocus();
    }
}
