import { UserRoleIntarface } from "./user_role.model";

export interface UserListIntarface {
  first_name: string;
  email: string;
  mobile: string;
  user_role: UserRoleIntarface
  user_status: string;
  action: string;

  }
  