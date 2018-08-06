package org.olacathedral.paver;

import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.layout.Pane;

import java.io.File;

class MapPane extends ZoomableScrollPane {

    private Pane backgroundPane;

    private MapPane(Pane pane, PaveStone paveStone) {
        super(pane);

        String currentPath = new File(System.getProperty("user.dir")).toURI().toString();
        ImageView backgroundImageView = new ImageView(currentPath + "resources/images/cathedral-color.png");

        pane.setPrefSize(backgroundImageView.getImage().getWidth(), backgroundImageView.getImage().getHeight());
        pane.getChildren().add(backgroundImageView);

        pane.getChildren().add(paveStone);

        pane.setOnMouseClicked(event -> {
            if (event.getButton() == MouseButton.PRIMARY) {
                pane.getChildren().remove(paveStone);

                paveStone.setX(event.getX());
                paveStone.setY(event.getY());

                ((EditPaveStoneScene) getScene()).updateCoordinateLabels();

                pane.getChildren().add(paveStone);
            }
        });

        this.backgroundPane = pane;
    }

    MapPane(PaveStone paveStone) {
        this(new Pane(), paveStone);
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
