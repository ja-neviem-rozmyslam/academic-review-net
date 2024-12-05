package com.ukf.arn.Submissions;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ukf.arn.Users.User;
import jakarta.persistence.*;
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
    @Column(name = "folder_hash")
    private String folderHash;

    private LocalDateTime timestamp;

    @Column(name = "conferences_id")
    private Long conferencesId;

    @Column(name = "reviewer_id")
    private UUID reviewerId;

    private String review;

    @Column(name = "theses_categories_id")
    private Long thesesCategoriesId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "theses_authors",
            joinColumns = @JoinColumn(name = "thesis_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> authors;

    public Submission() {
    }

    public Submission(String thesisTitle, String abstractSk, String abstractEn, String folderHash, Long conferencesId, Long thesesCategoriesId, Set<User> authors) {
        this.thesisTitle = thesisTitle;
        this.abstractSk = abstractSk;
        this.abstractEn = abstractEn;
        this.folderHash = folderHash;
        this.conferencesId = conferencesId;
        this.thesesCategoriesId = thesesCategoriesId;
        this.authors = authors;
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

    public String getFolderHash() {
        return folderHash;
    }

    public void setFolderHash(String folderHash) {
        this.folderHash = folderHash;
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

    public Long getThesesCategoriesId() {
        return thesesCategoriesId;
    }

    public void setThesesCategoriesId(Long thesesCategoriesId) {
        this.thesesCategoriesId = thesesCategoriesId;
    }

    public Set<User> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<User> authors) {
        this.authors = authors;
    }
}