package org.olacathedral.paver;

import javafx.geometry.Rectangle2D;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Circle;
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

        backgroundContainer.widthProperty().addListener((observable, oldValue, newValue) -> {
            this.width = newValue.doubleValue();
        });

        backgroundContainer.heightProperty().addListener((observable, oldValue, newValue) -> {
            this.height = newValue.doubleValue();
            backgroundView.setViewport(new Rectangle2D(x, y, this.width, this.height));
        });

        Circle marker = new Circle(paveStone.getX() - x, paveStone.getY() - y, 2.0);
        marker.setFill(Paint.valueOf("#f00"));

        backgroundContainer.getChildren().add(marker);

        backgroundView.setOnMouseClicked(event -> System.out.println(event.getX() + " " + event.getY()));
        backgroundContainer.setOnMouseClicked(event -> System.out.println(event.getX() + " " + event.getY()));

        getChildren().add(backgroundContainer);

        ImageView referenceView = new ImageView(resourcesDir + "cathedral-monochrome-reference.png");

        double referenceImageWidth = referenceView.getImage().getWidth();
        double referenceImageHeight = referenceView.getImage().getHeight();

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
        AnchorPane.setBottomAnchor(referenceViewContainer, 10.0);
        AnchorPane.setRightAnchor(referenceViewContainer, 10.0);

        getChildren().add(anchorPane);
    }
}
