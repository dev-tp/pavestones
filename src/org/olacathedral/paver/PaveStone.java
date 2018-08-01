package org.olacathedral.paver;

import java.util.Date;

class PaveStone {

    private Date dateSubmitted;
    private int id;
    private int x;
    private int y;
    private String comments;
    private String dedicatedTo;
    private String donor;

    PaveStone() {
        this(-1, "", "", -1, -1, "", null);
    }

    PaveStone(int id, String donor, String dedicatedTo, int x, int y, String comments, Date dateSubmitted) {
        this.comments = comments;
        this.dateSubmitted = dateSubmitted;
        this.dedicatedTo = dedicatedTo;
        this.donor = donor;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    Date getDateSubmitted() {
        return dateSubmitted;
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

    String getComments() {
        return comments;
    }

    String getDedicatedTo() {
        return dedicatedTo;
    }

    String getDonor() {
        return donor;
    }
}
