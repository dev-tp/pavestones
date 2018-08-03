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

    void addPaveStone(PaveStone paveStone) {
        try {
            String query = "INSERT INTO pavestones (donor, dedicated_to, x, y, comments) VALUES (?, ?, ?, ?, ?)";

            PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, paveStone.getDonor());
            preparedStatement.setString(2, paveStone.getDedicatedTo());
            preparedStatement.setInt(3, (int) paveStone.getX());
            preparedStatement.setInt(4, (int) paveStone.getY());
            preparedStatement.setString(5, paveStone.getComments());

            preparedStatement.executeUpdate();

            ResultSet resultSet = preparedStatement.getGeneratedKeys();

            if (resultSet.next()) {
                paveStone.setId(resultSet.getInt(1));
            }

            paveStone.setDateSubmitted(System.currentTimeMillis());

            paveStones.add(paveStone);
            SearchScene.update();

        } catch (SQLException sqlException) {
            System.err.println("Could not add pave stone dedicated to: " + paveStone.getDedicatedTo());
        }
    }

    void deletePaveStone(PaveStone paveStone) {
        try {
            String query = "DELETE FROM pavestones WHERE id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, paveStone.getId());

            preparedStatement.execute();

            paveStones.remove(paveStone);
            SearchScene.update();

        } catch (SQLException sqlException) {
            System.err.println("Could not delete PaveStone with ID: " + paveStone.getId());
        }
    }

    ArrayList<PaveStone> getAllPaveStones() {
        if (connection != null && paveStones.size() == 0) {
            try {
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT id, donor, dedicated_to, x, y, comments, date_submitted FROM pavestones");

                while (resultSet.next()) {
                    paveStones.add(new PaveStone(
                            resultSet.getInt(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getInt(5),
                            resultSet.getString(6),
                            resultSet.getTimestamp(7)
                    ));
                }

            } catch (SQLException sqlException) {
                System.err.println("Could not retrieve all PaveStones from database.");
            }
        }

        return paveStones;
    }

    ArrayList<PaveStone> search(String term) {
        ArrayList<PaveStone> paveStones = new ArrayList<>();

        try {
            String query = "SELECT id, donor, dedicated_to, x, y, comments, date_submitted FROM pavestones WHERE donor LIKE ? OR dedicated_to LIKE ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, "%" + term + "%");
            preparedStatement.setString(2, "%" + term + "%");

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                paveStones.add(new PaveStone(
                        resultSet.getInt(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getInt(4),
                        resultSet.getInt(5),
                        resultSet.getString(6),
                        resultSet.getTimestamp(7)
                ));
            }

        } catch (SQLException sqlException) {
            System.err.println("Something went wrong while searching for term: " + term);
        }

        return paveStones;
    }

    void updatePaveStone(PaveStone paveStone) {
        try {
            String query = "UPDATE pavestones SET donor = ?, dedicated_to = ?, x = ?, y = ?, comments = ? WHERE id = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, paveStone.getDonor());
            preparedStatement.setString(2, paveStone.getDedicatedTo());
            preparedStatement.setInt(3, (int) paveStone.getX());
            preparedStatement.setInt(4, (int) paveStone.getY());
            preparedStatement.setString(5, paveStone.getComments());
            preparedStatement.setInt(6, paveStone.getId());

            preparedStatement.execute();

        } catch (SQLException sqlException) {
            System.err.println("Could not update PaveStone with ID: " + paveStone.getId());
        }
    }
}
