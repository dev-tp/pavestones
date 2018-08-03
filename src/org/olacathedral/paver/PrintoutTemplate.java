package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

class PrintoutTemplate extends VBox {

    PrintoutTemplate(PaveStone paveStone, double width, double height) {
        setWidth(width);
        setHeight(height);

        Insets margin10Bottom = new Insets(0, 0, 10, 0);

        HBox header = new HBox();
        header.setAlignment(Pos.CENTER_LEFT);
        setMargin(header, margin10Bottom);

        Pane imageWrapper = new Pane();
        imageWrapper.setStyle("-fx-background-color: #e3b844");
        imageWrapper.setPrefSize(100.0, 100.0);

        VBox headerTextWrapper = new VBox();
        headerTextWrapper.setAlignment(Pos.CENTER);

        Label cathedralLabel = new Label("Cathedral Paving Stone Designated for:");
        VBox.setMargin(cathedralLabel, margin10Bottom);

        headerTextWrapper.getChildren().addAll(cathedralLabel, new Label(paveStone.getDedicatedTo()));
        headerTextWrapper.setPrefWidth(width - 100.0);

        header.getChildren().addAll(imageWrapper, headerTextWrapper);

        getChildren().add(header);

        Pane map = new Pane();
        map.setPrefSize(width, 404.0);
        map.setStyle("-fx-background-color: #000");
        setMargin(map, margin10Bottom);

        getChildren().add(map);

        VBox contentWrapper = new VBox();
        contentWrapper.setAlignment(Pos.TOP_CENTER);

        Text[] paragraphs = new Text[2];

        paragraphs[0] = new Text();
        paragraphs[0].setText(
                "Thank you for your gift to the Cathedral of Our Lady of the Angels. Your designated paving stone is " +
                        "an enduring symbol of faith and devotion. We sincerely appreciate your generosity and invite" +
                        "you to use this map of the Cathedral floor plan to locate your stone."
        );
        paragraphs[0].setWrappingWidth(width);
        VBox.setMargin(paragraphs[0], margin10Bottom);

        paragraphs[1] = new Text();
        paragraphs[1].setWrappingWidth(width);
        paragraphs[1].setText(
                "Your pave stone is indicated by the red dot in the \"Enlarged Area\". The image labeled \"Overall " +
                        "Plan\" shows the entire floor plan and the red rectangle indicates the area being enlarged."
        );

        contentWrapper.getChildren().addAll(paragraphs);

        getChildren().add(contentWrapper);
    }
}
