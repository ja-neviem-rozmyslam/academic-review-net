package com.ukf.arn.Entities;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.domain.Sort;

import java.util.List;

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

    public static OrderSpecifier[] buildOrderSpecifiers(List<ComparableExpressionBase<?>> columns, Sort.Direction direction) {
        return columns.stream()
                .map(column -> buildOrderSpecifier(column, direction))
                .toArray(OrderSpecifier[]::new);
    }

    public static boolean isValueEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
