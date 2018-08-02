package org.olacathedral.paver;

import java.sql.Timestamp;

class PaveStone {

    private double x;
    private double y;
    private int id;
    private String comments;
    private String dedicatedTo;
    private String donor;
    private Timestamp dateSubmitted;

    PaveStone() {
        this(-1, "", "", -1, -1, "", null);
    }

    PaveStone(PaveStone paveStone) {
        comments = paveStone.comments;
        dateSubmitted = paveStone.dateSubmitted;
        dedicatedTo = paveStone.dedicatedTo;
        donor = paveStone.donor;
        id = paveStone.id;
        x = paveStone.x;
        y = paveStone.y;
    }

    PaveStone(int id, String donor, String dedicatedTo, double x, double y, String comments, Timestamp dateSubmitted) {
        this.comments = comments;
        this.dateSubmitted = dateSubmitted;
        this.dedicatedTo = dedicatedTo;
        this.donor = donor;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    Timestamp getDateSubmitted() {
        return dateSubmitted;
    }

    double getX() {
        return x;
    }

    double getY() {
        return y;
    }

    int getId() {
        return id;
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

    void setComments(String comments) {
        this.comments = comments;
    }

    void setDateSubmitted(long time) {
        if (dateSubmitted != null) {
            dateSubmitted.setTime(time);
        } else {
            dateSubmitted = new Timestamp(time);
        }
    }

    void setDedicatedTo(String dedicatedTo) {
        this.dedicatedTo = dedicatedTo;
    }

    void setDonor(String donor) {
        this.donor = donor;
    }

    void setX(double x) {
        this.x = x;
    }

    void setY(double y) {
        this.y = y;
    }
}
