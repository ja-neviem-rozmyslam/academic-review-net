package com.ukf.arn.Users.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Users.Objects.UserDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.data.domain.Sort.Direction;
import java.util.List;


import static com.ukf.arn.ConstantsKatalog.CONFERENCE;
import static com.ukf.arn.ConstantsKatalog.Role.*;
import static com.ukf.arn.ConstantsKatalog.USER;
import static com.ukf.arn.Entities.SqlUtils.*;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findAllByPredicate(BooleanBuilder predicate, Sort sort) {
        return new JPAQuery<>(entityManager)
                .select(USER)
                .from(USER)
                .where(predicate)
                .orderBy(buildSort(sort))
                .fetch();
    }

    public static BooleanBuilder createPredicate(UserSearchDto searchObject) {
        BooleanBuilder predicate = new BooleanBuilder();

        if (!isValueEmpty(searchObject.getName())) {
            predicate.and(createLikePredicate(USER.surname, searchObject.getName()))
                    .or(createLikePredicate(USER.name, searchObject.getName()));
        }

       if (searchObject.getUniversity() != null) {
            predicate.and(USER.university.id.eq(searchObject.getUniversity()));
        }

        if (!isValueEmpty(searchObject.getRole())){
            predicate.and(USER.roles.any().in(searchObject.getRole()));
        }

        if (!isValueEmpty(searchObject.getEmail())){
            predicate.and(createLikePredicate(USER.email, searchObject.getEmail()));
        }

        if (searchObject.isAdmin()){
            predicate.and(USER.roles.any().in(ADMIN.getCode(), SUPERADMIN.getCode()));
        }
        else {
            predicate.and((USER.roles.any().in(STUDENT.getCode(), REVIEWER.getCode())));
        }


        return predicate;
    }

    public static OrderSpecifier[] buildSort(Sort sort) {
        if (sort != null) {
            switch (sort.getColumn()) {
                case "name":
                    return buildOrderSpecifiers(List.of(USER.surname, USER.name), sort.getDirection());
                case "email":
                    return buildOrderSpecifiers(List.of(USER.email), sort.getDirection());
                case "university":
                    return buildOrderSpecifiers(List.of(USER.university.name), sort.getDirection());
                case "roles":
                    return buildOrderSpecifiers(List.of(USER.roles.size()), sort.getDirection());
            }
        }
        return buildOrderSpecifiers(List.of(USER.name), Direction.ASC);
    }

    public static UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setEmail(user.getEmail());
        userDto.setRegistrationDate(user.getRegistrationDate());
        userDto.setUniversity(user.getUniversity());
        userDto.setRoles(user.getRoles());
        userDto.setVerified(user.isVerified());

        return userDto;
    }

}
