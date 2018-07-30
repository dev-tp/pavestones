package org.olacathedral.paver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

class Database {

    private static final String DATABASE_URL = "jdbc:mysql://localhost/pavingstones?" +
            "useUnicode=true&" +
            "useJDBCCompliantTimeZoneShift=true&" +
            "useLegacyDatetimeCode=false&" +
            "serverTimezone=UTC";

    private static final String USER = "";
    private static final String PASSWORD = "";

    private Connection connection;

    Database() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        connection = DriverManager.getConnection(DATABASE_URL, USER, PASSWORD);
    }

    ArrayList<PaveStone> getAllPaveStones() throws SQLException {
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery("SELECT * FROM pavestones");

        ArrayList<PaveStone> paveStones = new ArrayList<>();

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

        return paveStones;
    }
}
