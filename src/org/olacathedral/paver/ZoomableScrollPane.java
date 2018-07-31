package org.olacathedral.paver;

import javafx.geometry.Bounds;
import javafx.geometry.Point2D;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.control.ScrollPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;

class ZoomableScrollPane extends ScrollPane {

    private static final double ZOOM_RATE = 0.02;

    private Pane target;
    private Node zoomNode;

    double scale = 1.0;

    ZoomableScrollPane(Pane target) {
        super();

        this.target = target;
        zoomNode = new Group(target);

        setContent(outerNode(zoomNode));

        setPannable(true);
        setHbarPolicy(ScrollPane.ScrollBarPolicy.NEVER);
        setVbarPolicy(ScrollPane.ScrollBarPolicy.NEVER);
        setFitToHeight(true);
        setFitToWidth(true);

        updateScale();
    }

    private Node outerNode(Node node) {
        Node outerNode = centeredNode(node);

        outerNode.setOnScroll(event -> {
            event.consume();
            onScroll(event.getTextDeltaY(), new Point2D(event.getX(), event.getY()));
        });

        return outerNode;
    }

    private Node centeredNode(Node node) {
        VBox vBox = new VBox(node);
        vBox.setAlignment(Pos.CENTER);
        return vBox;
    }

    void updateScale() {
        target.setScaleX(scale);
        target.setScaleY(scale);
    }

    private void onScroll(double wheelDelta, Point2D mousePoint) {
        double zoomFactor = Math.exp((Double.compare(wheelDelta, 0) < 0 ? -1.0 : 1.0) * ZOOM_RATE);

        if (target.getHeight() * scale * zoomFactor < getHeight()) {
            if (wheelDelta > 0) {
                scale = scale * zoomFactor;
            }
        } else {
            scale = scale * zoomFactor;
        }

        updateScale();
        layout(); // refresh ScrollPane scroll positions & target bounds

        Bounds innerBounds = zoomNode.getLayoutBounds();
        Bounds viewportBounds = getViewportBounds();

        // calculate pixel offsets from [0, 1] range
        double valX = getHvalue() * (innerBounds.getWidth() - viewportBounds.getWidth());
        double valY = getVvalue() * (innerBounds.getHeight() - viewportBounds.getHeight());

        // convert target coordinates to zoomTarget coordinates
        Point2D posInZoomTarget = target.parentToLocal(zoomNode.parentToLocal(mousePoint));

        // calculate adjustment of scroll position (pixels)
        Point2D adjustment = target.getLocalToParentTransform().deltaTransform(posInZoomTarget.multiply(zoomFactor - 1));

        // convert back to [0, 1] range
        // (too large/small values are automatically corrected by ScrollPane)
        Bounds updatedInnerBounds = zoomNode.getBoundsInLocal();

        setHvalue((valX + adjustment.getX()) / (updatedInnerBounds.getWidth() - viewportBounds.getWidth()));
        setVvalue((valY + adjustment.getY()) / (updatedInnerBounds.getHeight() - viewportBounds.getHeight()));
    }

    /**
     * Fit node's height with ScrollPane's height. Call this only when the stage has loaded.
     */
    void setToFit() {
        if (getScene() != null) {
            scale = getHeight() / target.getHeight();
            updateScale();
        }
    }
}
