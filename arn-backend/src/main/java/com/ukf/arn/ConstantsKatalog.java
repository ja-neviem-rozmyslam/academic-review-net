package com.ukf.arn;

import com.ukf.arn.Conferences.QConference;
import com.ukf.arn.Submissions.QSubmission;
import com.ukf.arn.Users.QUser;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ConstantsKatalog {
    public static final QConference CONFERENCE = QConference.conference;
    public static final QUser USER = QUser.user;
    public static final QSubmission SUBMISSION = QSubmission.submission;


    public static final String TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS";
    public static final String TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND";
    public static final String TOKEN_EXPIRED = "TOKEN_EXPIRED";

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


