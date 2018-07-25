package org.olacathedral.paver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

class Database {

    private static final String DATABASE_URL = "jdbc:mysql://localhost/pavingstones";
    private static final String USER = "";
    private static final String PASSWORD = "";

    private Connection connection;

    Database() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        connection = DriverManager.getConnection(DATABASE_URL, USER, PASSWORD);
    }

    ArrayList<Integer[]> getAllCoordinates() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT x, y FROM donors");

        ArrayList<Integer[]> coordinates = new ArrayList<>();

        while (resultSet.next()) {
            Integer[] coordinate = new Integer[2];

            coordinate[0] = resultSet.getInt(1);
            coordinate[1] = resultSet.getInt(2);

            coordinates.add(coordinate);
        }

        return coordinates;
    }
}
