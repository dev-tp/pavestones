package org.olacathedral.paver;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

class LoginScene extends CustomScene {

    static boolean admin;

    private TextField usernameTextField;
    private PasswordField passwordField;
    private VBox container;

    LoginScene(Stage stage) {
        super(new VBox(), stage, "Login", 480, 720);
        container = (VBox) getRoot();
        load();
    }

    private static byte[] fromHex(String hex) {
        byte[] bytes = new byte[hex.length() / 2];

        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
        }

        return bytes;
    }

    @Override
    protected void load() {
        container.setAlignment(Pos.CENTER);

        GridPane grid = new GridPane();

        usernameTextField = new TextField();

        passwordField = new PasswordField();
        passwordField.setOnAction(event -> login());

        Button loginButton = new Button("Login");
        loginButton.setMinWidth(100);
        loginButton.setOnAction(event -> login());

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

    private void login() {
        User user = Main.database.getPassword(usernameTextField.getText());

        if (user != null) {
            if (validatePassword(passwordField.getText(), user.getPassword())) {
                admin = user.isAdmin();

                CustomScene scene = new SearchScene(getStage());
                scene.show();
                scene.centerStage();
            } else {
                passwordField.setText("");
            }
        }
    }

    private static boolean validatePassword(String originalPassword, String storedPassword) {
        String[] parts = storedPassword.split(":");
        int iterations = Integer.parseInt(parts[0]);
        byte[] salt = fromHex(parts[1]);
        byte[] hash = fromHex(parts[2]);

        PBEKeySpec keySpec = new PBEKeySpec(originalPassword.toCharArray(), salt, iterations, hash.length * 8);
        SecretKeyFactory secretKeyFactory;

        try {
            secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        } catch (NoSuchAlgorithmException exception) {
            System.err.println("PBKDF2WithHmacSHA1 is not available.");
            return false;
        }

        byte[] testHash;

        try {
            testHash = secretKeyFactory.generateSecret(keySpec).getEncoded();
        } catch (InvalidKeySpecException exception) {
            System.err.println("Invalid PBE key specification.");
            return false;
        }

        int diff = hash.length ^ testHash.length;

        for (int i = 0; i < hash.length && i < testHash.length; i++) {
            diff |= hash[i] ^ testHash[i];
        }

        return diff == 0;
    }
}

class User {

    private boolean admin;
    private String password;

    User(String password, boolean admin) {
        this.password = password;
        this.admin = admin;
    }

    boolean isAdmin() {
        return admin;
    }

    String getPassword() {
        return password;
    }
}