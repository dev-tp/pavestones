package org.olacathedral.paver;

public class Main {

    public static void main(String[] args) {
        try {
            Database database = new Database();
            System.out.println(database.getAllPaveStones().size());
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
