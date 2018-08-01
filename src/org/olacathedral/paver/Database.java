package org.olacathedral.paver;

import java.sql.*;
import java.util.ArrayList;

class Database {

    private static final String DATABASE_URL = "jdbc:mysql://localhost/pavingstones?" +
            "useUnicode=true&" +
            "useJDBCCompliantTimeZoneShift=true&" +
            "useLegacyDatetimeCode=false&" +
            "serverTimezone=UTC";

    private static final String USER = "";
    private static final String PASSWORD = "";

    private ArrayList<PaveStone> paveStones;
    private Connection connection;

    Database() {
        paveStones = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException exception) {
            System.err.println("com.mysql.cj.jdbc.Driver not found.");
        }

        try {
            connection = DriverManager.getConnection(DATABASE_URL, USER, PASSWORD);
        } catch (SQLException exception) {
            System.err.println("Could not establish a connection with server at " + DATABASE_URL + ".");
        } /* finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        } */
    }

    void deletePaveStone(PaveStone paveStone) {
        try {
            String query = "DELETE FROM pavestones WHERE id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, paveStone.getId());

            preparedStatement.execute();

        } catch (SQLException sqlException) {
            System.err.println("Could not delete PaveStone with ID: " + paveStone.getId());
        }
    }

    ArrayList<PaveStone> getAllPaveStones() {
        if (connection != null && paveStones.size() == 0) {
            try {
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM pavestones");

                while (resultSet.next()) {
                    paveStones.add(new PaveStone(
                            resultSet.getInt(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getInt(5),
                            resultSet.getString(6),
                            resultSet.getDate(7)
                    ));
                }

            } catch (SQLException sqlException) {
                System.err.println("Could not retrieve all PaveStones from database.");
            }
        }

        return paveStones;
    }
}
