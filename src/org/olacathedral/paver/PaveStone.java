package org.olacathedral.paver;

class PaveStone {

    private int id;
    private int x;
    private int y;
    private String dedicatedTo;
    private String donor;

    PaveStone(int id, String donor, String dedicatedTo, int x, int y) {
        this.dedicatedTo = dedicatedTo;
        this.donor = donor;
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

    String getDonor() {
        return donor;
    }

    String getDedicatedTo() {
        return dedicatedTo;
    }
}
