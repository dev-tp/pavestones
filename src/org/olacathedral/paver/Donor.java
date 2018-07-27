package org.olacathedral.paver;

class Donor {

    private int id;
    private int x;
    private int y;
    private String alias;
    private String fullName;

    Donor(int id, String fullName, String alias, int x, int y) {
        this.alias = alias;
        this.fullName = fullName;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    int getId() {
        return id;
    }

    int getX() {
        return x;
    }

    int getY() {
        return y;
    }

    String getAlias() {
        return alias;
    }

    String getFullName() {
        return fullName;
    }
}
