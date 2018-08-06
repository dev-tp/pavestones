package org.olacathedral.paver;

import javafx.geometry.Rectangle2D;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Rectangle;

import java.io.File;

class StaticMapPane extends StackPane {

    private double width;
    private double height;

    StaticMapPane(PaveStone paveStone, double width, double height) {
        this.width = width;
        this.height = height;

        double x = paveStone.getX() - width / 2;
        double y = paveStone.getY() - height / 2;

        String resourcesDir = new File(System.getProperty("user.dir")).toURI().toString() + "resources/images/";

        ImageView backgroundView = new ImageView(resourcesDir + "cathedral-monochrome.png");
        backgroundView.setViewport(new Rectangle2D(x, y, width, height));

        Pane backgroundContainer = new Pane();
        backgroundContainer.getChildren().add(backgroundView);

        backgroundContainer.widthProperty().addListener((observable, oldValue, newValue) -> this.width = newValue.doubleValue());

        backgroundContainer.heightProperty().addListener((observable, oldValue, newValue) -> {
            this.height = newValue.doubleValue();
            backgroundView.setViewport(new Rectangle2D(x, y, this.width, this.height));
        });

        PaveStone marker = new PaveStone(paveStone);
        marker.setX(paveStone.getX() - x);
        marker.setY(paveStone.getY() - y);
        backgroundContainer.getChildren().add(marker);

        getChildren().add(backgroundContainer);

        ImageView referenceView = new ImageView(resourcesDir + "cathedral-monochrome-reference.png");
        referenceView.setFitWidth(referenceView.getImage().getWidth() / referenceView.getImage().getHeight() * 160.0);
        referenceView.setFitHeight(160.0);

        double referenceImageWidth = referenceView.getFitWidth();
        double referenceImageHeight = referenceView.getFitHeight();

        Pane referenceViewContainer = new Pane();
        referenceViewContainer.setPrefSize(referenceImageWidth, referenceImageHeight);
        referenceViewContainer.getChildren().add(referenceView);

        double scaleX = referenceImageWidth / backgroundView.getImage().getWidth();
        double scaleY = referenceImageHeight / backgroundView.getImage().getHeight();
        double rectangleX = (paveStone.getX() - referenceImageWidth / 2) * scaleX;
        double rectangleY = (paveStone.getY() - referenceImageHeight / 2) * scaleY;

        Rectangle paveStoneArea = new Rectangle(rectangleX, rectangleY, referenceImageWidth / 12, referenceImageHeight / 16);
        paveStoneArea.setFill(null);
        paveStoneArea.setStroke(Paint.valueOf("#f00"));
        referenceViewContainer.getChildren().add(paveStoneArea);

        AnchorPane anchorPane = new AnchorPane();
        anchorPane.getChildren().add(referenceViewContainer);
        AnchorPane.setBottomAnchor(referenceViewContainer, 4.0);
        AnchorPane.setRightAnchor(referenceViewContainer, 4.0);

        getChildren().add(anchorPane);
    }
}
