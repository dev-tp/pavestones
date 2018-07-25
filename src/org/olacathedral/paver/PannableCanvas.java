package org.olacathedral.paver;

import javafx.beans.property.DoubleProperty;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.ImageView;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;

import java.io.File;

class PannableCanvas extends Pane {

    private DoubleProperty scale;

    PannableCanvas() {
        scale = new SimpleDoubleProperty(1.0);

        setPrefSize(600, 600);
        setStyle("-fx-background-color: lightgrey; -fx-border-color: blue;");

        // add scale transform
        scaleXProperty().bind(scale);
        scaleYProperty().bind(scale);
    }

    /**
     * Add a grid to the canvas, send it to back
     */
    void addGrid() {
//        double w = getBoundsInLocal().getWidth();
//        double h = getBoundsInLocal().getHeight();
//
//        // add grid
//        Canvas grid = new Canvas(w, h);
//
//        // don't catch mouse events
//        grid.setMouseTransparent(true);
//
//        GraphicsContext gc = grid.getGraphicsContext2D();
//
//        gc.setStroke(Color.GRAY);
//        gc.setLineWidth(1);
//
//        // draw grid lines
//        double offset = 50;
//
//        for (double i = offset; i < w; i += offset) {
//            gc.strokeLine(i, 0, i, h);
//            gc.strokeLine(0, i, w, i);
//        }
//
//        getChildren().add(grid);
//
//        grid.toBack();

        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();
        ImageView background = new ImageView(currentPath + "resources/images/Motherlessboard.png");
        background.setFitWidth(getBoundsInLocal().getWidth());
        background.setPreserveRatio(true);
        getChildren().add(background);
    }

    double getScale() {
        return scale.get();
    }

    void setScale(double scale) {
        this.scale.set(scale);
    }

    void setPivot(double x, double y) {
        setTranslateX(getTranslateX() - x);
        setTranslateY(getTranslateY() - y);
    }
}
