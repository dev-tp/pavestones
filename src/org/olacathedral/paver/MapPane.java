package org.olacathedral.paver;

import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;

import java.io.File;

class MapPane extends ZoomableScrollPane {

    private Circle marker;
    private Pane backgroundPane;

    private MapPane(Pane pane, PaveStone paveStone) {
        super(pane);

        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();
        ImageView backgroundImageView = new ImageView(currentPath + "resources/images/cathedral-color.png");

        pane.setPrefSize(backgroundImageView.getImage().getWidth(), backgroundImageView.getImage().getHeight());
        pane.getChildren().add(backgroundImageView);

        marker = new Circle();
        marker.setRadius(2.0);
        marker.setFill(Color.valueOf("#13437b"));

        if (paveStone != null) {
            marker.setCenterX(paveStone.getX());
            marker.setCenterY(paveStone.getY());

            // Tooltip.install(marker, new Tooltip(paveStone.getDedicatedTo()));

            pane.getChildren().add(marker);
        }

        pane.setOnMouseClicked(event -> {
            if (event.getButton() == MouseButton.PRIMARY) {
                pane.getChildren().remove(marker);
                marker.setCenterX(event.getX());
                marker.setCenterY(event.getY());
                pane.getChildren().add(marker);
            }
        });

        this.backgroundPane = pane;
    }

    MapPane(PaveStone paveStone) {
        this(new Pane(), paveStone);
    }

    MapPane() {
        this(new Pane(), null);
    }

    Pane getBackgroundPane() {
        return backgroundPane;
    }

    void focusOnPaveStone(PaveStone paveStone) {
        setHvalue(paveStone.getX() / backgroundPane.getWidth());
        setVvalue(paveStone.getY() / backgroundPane.getHeight());

        scale = 1.0;

        updateScale();
    }
}
