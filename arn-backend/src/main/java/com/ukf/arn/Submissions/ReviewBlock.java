package com.ukf.arn.Submissions;

public class ReviewBlock {
    private String id;
    private String reviewedCategory;
    private String reviewValue;
    private boolean isSelectable;

    public ReviewBlock() {}

    public ReviewBlock(String id, String reviewedCategory, String reviewValue, boolean isSelectable) {
        this.id = id;
        this.reviewedCategory = reviewedCategory;
        this.reviewValue = reviewValue;
        this.isSelectable = isSelectable;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReviewedCategory() {
        return reviewedCategory;
    }

    public void setReviewedCategory(String reviewedCategory) {
        this.reviewedCategory = reviewedCategory;
    }

    public String getReviewValue() {
        return reviewValue;
    }

    public void setReviewValue(String reviewValue) {
        this.reviewValue = reviewValue;
    }

    public boolean isSelectable() {
        return isSelectable;
    }

    public void setSelectable(boolean selectable) {
        isSelectable = selectable;
    }
}
