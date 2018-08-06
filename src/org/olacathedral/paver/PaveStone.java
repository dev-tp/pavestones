package org.olacathedral.paver;

import javafx.scene.control.Tooltip;
import javafx.scene.paint.Paint;
import javafx.scene.shape.Circle;

import java.sql.Timestamp;

class PaveStone extends Circle {

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

        setFill(Paint.valueOf("#f00"));
        setRadius(2.0);
        setX(paveStone.getX());
        setY(paveStone.getY());

        Tooltip.install(this, new Tooltip(paveStone.dedicatedTo));
    }

    PaveStone(int id, String donor, String dedicatedTo, double x, double y, String comments, Timestamp dateSubmitted) {
        this.comments = comments;
        this.dateSubmitted = dateSubmitted;
        this.dedicatedTo = dedicatedTo;
        this.donor = donor;
        this.id = id;

        setFill(Paint.valueOf("#f00"));
        setRadius(2.0);
        setCenterX(x);
        setCenterY(y);

        Tooltip.install(this, new Tooltip(dedicatedTo));
    }

    Timestamp getDateSubmitted() {
        return dateSubmitted;
    }

    double getX() {
        return getCenterX();
    }

    double getY() {
        return getCenterY();
    }

    int getPsId() {
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

    void setId(int id) {
        this.id = id;
    }

    void setX(double x) {
        setCenterX(x);
    }

    void setY(double y) {
        setCenterY(y);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaveStone paveStone = (PaveStone) o;
        return id == paveStone.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
