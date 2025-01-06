package com.ukf.arn.Entities;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Sort;

public class SqlUtils {

    public static BooleanExpression createLikePredicate(StringPath path, String value) {
        if (value.contains("*")) {
            String likePattern = value.replace("*", "%");
            return path.like(likePattern);
        } else {
            return path.eq(value);
        }
    }

    public static OrderSpecifier buildOrderSpecifier(ComparableExpressionBase<?> column, Sort.Direction direction) {
        return direction.isAscending() ? column.asc() : column.desc();
    }

    public static boolean isValueEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
