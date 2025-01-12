import { SelectOption } from '../../../components/arn-select/entities/SelectOption';
import { UserPrettyNames, UserRoles } from '../../../constants';

export const USERS_ROLE_OPTIONS: SelectOption[] = [
  { value: UserRoles.STUDENT, display: UserPrettyNames[UserRoles.STUDENT]},
  { value: UserRoles.REVIEWER, display: UserPrettyNames[UserRoles.REVIEWER]}
]
export const ADMIN_ROLE_OPTIONS: SelectOption[] = [
  { value: UserRoles.ADMIN, display: UserPrettyNames[UserRoles.ADMIN]},
  { value: UserRoles.SUPERADMIN, display: UserPrettyNames[UserRoles.SUPERADMIN]}
]
