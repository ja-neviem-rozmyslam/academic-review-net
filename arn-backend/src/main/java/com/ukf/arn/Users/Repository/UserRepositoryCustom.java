package com.ukf.arn.Users.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Entities.Conference;
import com.ukf.arn.Entities.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> findAllByPredicate(BooleanBuilder predicate, Sort sort);
    String getNameAndSurnameById(String uuid);
    List<User> findAllByRole(String role);
}
