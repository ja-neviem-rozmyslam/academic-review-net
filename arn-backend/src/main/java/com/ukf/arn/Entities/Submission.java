package com.ukf.arn.Entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "uploaded_theses")
public class Submission implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "thesis_title")
    private String thesisTitle;
    @Column(name = "abstract_sk")
    private String abstractSk;
    @Column(name = "abstract_en")
    private String abstractEn;

    @CreationTimestamp
    @Column(name = "timestamp", insertable = false)
    private LocalDateTime timestamp;

    @Column(name = "conference_id")
    private Long conferencesId;

    private String review;

    @Column(name = "author_id")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID authorId;

    @Column(name = "reviewer_id")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID reviewerId;

    @Column(name = "type_id")
    private Long thesesType;

    @Column(name = "coauthors")
    private String coauthors;

    public Submission() {
    }

    public Submission(String thesisTitle, String abstractSk, String abstractEn, UUID authorId, Long conferencesId, Long thesesType, String coauthors) {
        this.thesisTitle = thesisTitle;
        this.abstractSk = abstractSk;
        this.abstractEn = abstractEn;
        this.authorId = authorId;
        this.conferencesId = conferencesId;
        this.thesesType = thesesType;
        this.coauthors = coauthors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThesisTitle() {
        return thesisTitle;
    }

    public void setThesisTitle(String thesisTitle) {
        this.thesisTitle = thesisTitle;
    }

    public String getAbstractSk() {
        return abstractSk;
    }

    public void setAbstractSk(String abstractSk) {
        this.abstractSk = abstractSk;
    }

    public String getAbstractEn() {
        return abstractEn;
    }

    public void setAbstractEn(String abstractEn) {
        this.abstractEn = abstractEn;
    }

    public UUID getAuthorId() {
        return authorId;
    }

    public void setAuthorId(UUID authorId) {
        this.authorId = authorId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Long getConferencesId() {
        return conferencesId;
    }

    public void setConferencesId(Long conferencesId) {
        this.conferencesId = conferencesId;
    }

    public UUID getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(UUID reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Long getThesesType() {
        return thesesType;
    }

    public void setThesesType(Long thesesCategoriesId) {
        this.thesesType = thesesCategoriesId;
    }

    public String getCoauthors() {
        return coauthors;
    }

    public void setCoauthors(String coauthors) {
        this.coauthors = coauthors;
    }
}