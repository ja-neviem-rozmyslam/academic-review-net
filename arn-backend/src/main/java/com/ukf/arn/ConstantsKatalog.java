package com.ukf.arn;

public class ConstantsKatalog {
    public class Roles {
        public static final String STUDENT = "S";
        public static final String REVIEWER = "R";
        public static final String ADMIN = "A";
        public static final String SUPERADMIN = "SA";

        private Roles() {
        }
    }

    enum Role {
        STUDENT("S", "Student"),
        REVIEWER("R", "Reviewer"),
        ADMIN("A"),
        SUPERADMIN("SA");

        private final String roleIdent;
        private final String roleName;

        Role(String roleIdent, String roleName) {
            this.roleIdent = roleIdent;
            this.roleName = roleName;
        }

        Role(String roleIdent) {
            this.roleIdent = roleIdent;
            this.roleName = null;
        }

        public String getRoleIdent() {
            return roleIdent;
        }

        public String getRoleName() {
            return roleName;
        }
    }
}


