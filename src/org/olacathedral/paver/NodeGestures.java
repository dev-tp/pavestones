package org.olacathedral.paver;

import javafx.event.EventHandler;
import javafx.scene.Node;
import javafx.scene.input.MouseEvent;

/**
 * Listeners for making the nodes draggable via left mouse button. Considers if parent is zoomed.
 */
class NodeGestures {

    private DragContext nodeDragContext;
    private PannableCanvas canvas;

    NodeGestures(PannableCanvas canvas) {
        this.canvas = canvas;
        nodeDragContext = new DragContext();
    }

    private EventHandler<MouseEvent> onMousePressedEventHandler = new EventHandler<MouseEvent>() {

        public void handle(MouseEvent event) {
            if (!event.isPrimaryButtonDown()) { // left mouse button => dragging
                return;
            }

            nodeDragContext.mouseAnchorX = event.getSceneX();
            nodeDragContext.mouseAnchorY = event.getSceneY();

            Node node = (Node) event.getSource();

            nodeDragContext.translateAnchorX = node.getTranslateX();
            nodeDragContext.translateAnchorY = node.getTranslateY();
        }
    };

    private EventHandler<MouseEvent> onMouseDraggedEventHandler = new EventHandler<MouseEvent>() {

        public void handle(MouseEvent event) {
            if (!event.isPrimaryButtonDown()) { // left mouse button => dragging
                return;
            }

            double scale = canvas.getScale();

            Node node = (Node) event.getSource();

            node.setTranslateX(nodeDragContext.translateAnchorX + ((event.getSceneX() - nodeDragContext.mouseAnchorX) / scale));
            node.setTranslateY(nodeDragContext.translateAnchorY + ((event.getSceneY() - nodeDragContext.mouseAnchorY) / scale));

            event.consume();
        }
    };

    EventHandler<MouseEvent> getOnMousePressedEventHandler() {
        return onMousePressedEventHandler;
    }

    EventHandler<MouseEvent> getOnMouseDraggedEventHandler() {
        return onMouseDraggedEventHandler;
    }
}
