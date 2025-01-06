import { SelectOption } from '../../../components/arn-select/entities/SelectOption';
import { UserPrettyNames, UserRoles } from '../../../constants';

export const USERS_ROLE_OPTIONS: SelectOption[] = [
  { value: UserRoles.STUDENT, display: UserPrettyNames[UserRoles.STUDENT]},
  { value: UserRoles.REVIEWER, display: UserPrettyNames[UserRoles.REVIEWER]}
]

