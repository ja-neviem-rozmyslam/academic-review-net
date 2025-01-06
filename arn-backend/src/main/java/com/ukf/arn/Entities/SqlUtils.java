package com.ukf.arn.Entities;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.StringPath;

public class SqlUtils {

    public static BooleanExpression createLikePredicate(StringPath path, String value) {
        if (value.contains("*")) {
            String likePattern = value.replace("*", "%");
            return path.like(likePattern);
        } else {
            return path.eq(value);
        }
    }

    public static boolean isValueEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
