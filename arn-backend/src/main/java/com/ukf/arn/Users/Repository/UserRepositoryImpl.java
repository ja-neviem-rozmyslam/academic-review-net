package com.ukf.arn.Users.Repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.ukf.arn.Administration.Objects.Sort;
import com.ukf.arn.Administration.Objects.UserSearchDto;
import com.ukf.arn.Entities.University;
import com.ukf.arn.Entities.User;
import com.ukf.arn.Users.Objects.UserDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static com.ukf.arn.ConstantsKatalog.CONFERENCE;
import static com.ukf.arn.ConstantsKatalog.USER;
import static com.ukf.arn.Entities.SqlUtils.buildOrderSpecifier;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findAllByPredicate(BooleanBuilder predicate, OrderSpecifier orderSpecifier) {
        return new JPAQuery<>(entityManager)
                .select(USER)
                .from(USER)
                .where(predicate)
                .orderBy(orderSpecifier)
                .fetch();
    }

    public static BooleanBuilder createPredicate(UserSearchDto searchObject){
        BooleanBuilder predicate = new BooleanBuilder();



        return predicate;
    }

    public static OrderSpecifier buildSort(Sort sort){
        if (sort != null) {
            switch (sort.getColumn()) {
                case "name":
                    return buildOrderSpecifier(USER.name, sort.getDirection());

            }
        }
        return null;
    }

    public static UserDto mapToUserDto(User user){
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
