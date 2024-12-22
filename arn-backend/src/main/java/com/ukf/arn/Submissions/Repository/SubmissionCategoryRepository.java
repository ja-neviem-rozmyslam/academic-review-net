package com.ukf.arn.Submissions.Repository;

import com.ukf.arn.Entities.SubmissionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface SubmissionCategoryRepository extends JpaRepository<SubmissionCategory, Long> {
}
