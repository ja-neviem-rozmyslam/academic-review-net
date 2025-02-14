export const StatusMessages = {
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  TOKEN_NOT_FOUND: "TOKEN_NOT_FOUND",
  TOKEN_EXPIRED: "TOKEN_EXPIRED"
};

export const UserRoles = {
  STUDENT: 'S',
  REVIEWER: 'R',
  ADMIN: 'A',
  SUPERADMIN: 'SA'
}

export const UserPrettyNames = {
  [UserRoles.STUDENT]: 'Študent',
  [UserRoles.REVIEWER]: 'Recenzent',
  [UserRoles.ADMIN]: 'Administrátor',
  [UserRoles.SUPERADMIN]: 'Super Administrátor'
}
