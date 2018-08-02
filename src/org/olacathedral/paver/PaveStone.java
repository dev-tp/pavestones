package org.olacathedral.paver;

import java.util.Date;

class PaveStone {

    private Date dateSubmitted;
    private double x;
    private double y;
    private int id;
    private String comments;
    private String dedicatedTo;
    private String donor;

    PaveStone() {
        this(-1, "", "", -1, -1, "", null);
    }

    PaveStone(int id, String donor, String dedicatedTo, double x, double y, String comments, Date dateSubmitted) {
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
