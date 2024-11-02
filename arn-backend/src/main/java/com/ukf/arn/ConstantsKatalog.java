package com.ukf.arn;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ConstantsKatalog {
    public enum Role {
        STUDENT("S", "Študent"),
        REVIEWER("R", "Recenzent"),
        ADMIN("A", "Admin"),
        SUPERADMIN("SA", "Super Admin");

        private final String code;
        private final String prettyName;

        private static final Map<String, Role> codeToRoleMap = Stream.of(values())
                .collect(Collectors.toMap(Role::getCode, role -> role));

        Role(String code, String prettyName) {
            this.code = code;
            this.prettyName = prettyName;
        }

        public String getPrettyName() {
            return prettyName;
        }

        public String getCode() {
            return code;
        }

        public static String getPrettyNameByCode(String code) {
            Role role = codeToRoleMap.get(code);
            return role != null ? role.getPrettyName() : null;
        }
    }

}


