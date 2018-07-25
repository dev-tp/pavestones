package org.olacathedral.paver;

import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;
import javafx.scene.input.ScrollEvent;

/**
 * Listeners for making the scene's canvas draggable and zoomable
 */
class SceneGestures {

    private static final double MAX_SCALE = 10.0d;
    private static final double MIN_SCALE = .1d;

    private DragContext sceneDragContext;
    private PannableCanvas canvas;

    private EventHandler<MouseEvent> onMousePressedEventHandler = new EventHandler<MouseEvent>() {

        public void handle(MouseEvent event) {
            if (!event.isSecondaryButtonDown()) { // right mouse button => panning
                return;
            }

            sceneDragContext.mouseAnchorX = event.getSceneX();
            sceneDragContext.mouseAnchorY = event.getSceneY();

            sceneDragContext.translateAnchorX = canvas.getTranslateX();
            sceneDragContext.translateAnchorY = canvas.getTranslateY();

        }
    };

    private EventHandler<MouseEvent> onMouseDraggedEventHandler = new EventHandler<MouseEvent>() {

        public void handle(MouseEvent event) {
            if (!event.isSecondaryButtonDown()) { // right mouse button => panning
                return;
            }

            canvas.setTranslateX(sceneDragContext.translateAnchorX + event.getSceneX() - sceneDragContext.mouseAnchorX);
            canvas.setTranslateY(sceneDragContext.translateAnchorY + event.getSceneY() - sceneDragContext.mouseAnchorY);

            event.consume();
        }
    };

    SceneGestures(PannableCanvas canvas) {
        this.canvas = canvas;
        sceneDragContext = new DragContext();
    }

    /**
     * Mouse wheel handler: zoom to pivot point
     */
    private EventHandler<ScrollEvent> onScrollEventHandler = new EventHandler<ScrollEvent>() {

        @Override
        public void handle(ScrollEvent event) {
            double delta = 1.2;

            double scale = canvas.getScale(); // currently we only use Y, same value is used for X
            double oldScale = scale;

            if (event.getDeltaY() < 0) {
                scale /= delta;
            } else {
                scale *= delta;
            }

            scale = clamp(scale);

            double f = (scale / oldScale) - 1;

            double dx = (event.getSceneX() - (canvas.getBoundsInParent().getWidth() / 2 + canvas.getBoundsInParent().getMinX()));
            double dy = (event.getSceneY() - (canvas.getBoundsInParent().getHeight() / 2 + canvas.getBoundsInParent().getMinY()));

            canvas.setScale(scale);
            canvas.setPivot(f*dx, f*dy); // note: pivot value must be untransformed, i. e. without scaling

            event.consume();
        }
    };

    private static double clamp(double value) {
        if (Double.compare(value, MIN_SCALE) < 0) {
            return MIN_SCALE;
        }

        if (Double.compare(value, MAX_SCALE) > 0) {
            return MAX_SCALE;
        }

        return value;
    }

    EventHandler<MouseEvent> getOnMousePressedEventHandler() {
        return onMousePressedEventHandler;
    }

    EventHandler<MouseEvent> getOnMouseDraggedEventHandler() {
        return onMouseDraggedEventHandler;
    }

    EventHandler<ScrollEvent> getOnScrollEventHandler() {
        return onScrollEventHandler;
    }
}
