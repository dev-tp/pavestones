package org.olacathedral.paver;

public class Main {

    public static void main(String[] args) {
        try {
            Database database = new Database();
            System.out.println(database.getAllCoordinates().size());
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
