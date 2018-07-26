package org.olacathedral.paver;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.*;

class LoginScene extends Scene {

    private VBox container;
    private Button loginButton;

    LoginScene() {
        super(new VBox(), 480, 720);
        container = (VBox) getRoot();
        load();
    }

    Button getLoginButton() {
        return loginButton;
    }

    private void load() {
        container.setAlignment(Pos.CENTER);

        GridPane grid = new GridPane();

        TextField usernameTextField = new TextField();
        PasswordField passwordField = new PasswordField();
        loginButton = new Button("Login");

        loginButton.setMinWidth(100);

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
