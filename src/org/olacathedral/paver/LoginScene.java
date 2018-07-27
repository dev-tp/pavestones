package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.*;
import javafx.stage.Stage;

class LoginScene extends CustomScene {

    private VBox container;

    LoginScene(Stage stage) {
        super(new VBox(), stage, "Login", 480, 720);
        container = (VBox) getRoot();
        load();
    }

    @Override
    protected void load() {
        container.setAlignment(Pos.CENTER);

        GridPane grid = new GridPane();

        TextField usernameTextField = new TextField();
        PasswordField passwordField = new PasswordField();
        Button loginButton = new Button("Login");

        loginButton.setMinWidth(100);
        loginButton.setOnAction(event -> {
            CustomScene scene = new SearchScene(getStage());
            scene.show();
            scene.centerStage();
        });

        grid.add(new Label("Username"), 0, 0);
        grid.add(usernameTextField, 1, 0);
        grid.add(new Label("Password"), 0, 1);
        grid.add(passwordField, 1, 1);
        grid.add(loginButton, 1, 2);

        ColumnConstraints columnConstraints0 = new ColumnConstraints();
        columnConstraints0.setMinWidth(100);
        columnConstraints0.setHgrow(Priority.SOMETIMES);

        ColumnConstraints columnConstraints1 = new ColumnConstraints();
        columnConstraints1.setPrefWidth(540);
        columnConstraints0.setHgrow(Priority.SOMETIMES);

        grid.getColumnConstraints().add(columnConstraints0);
        grid.getColumnConstraints().add(columnConstraints1);

        for (int i = 0; i < 3; i++) {
            RowConstraints rowConstraints = new RowConstraints();
            rowConstraints.setMinHeight(36);
            grid.getRowConstraints().add(rowConstraints);
        }

        grid.setPadding(new Insets(0, 40, 0, 40));

        container.getChildren().add(grid);
    }
}
