package com.ukf.arn.Administration.Objects;

import org.springframework.data.domain.Sort.Direction;

public class Sort {
    private String column;
    private Direction direction;

    public Sort(String column, String direction) {
        this.column = column;
        this.direction = Direction.fromString(direction);
    }

    public String getColumn() {
        return column;
    }

    public Direction getDirection() {
        return direction;
    }

}
