import { UserType } from ".";

export type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT"
}

export type LoginSuccessAction = {
  type: AuthActionType.LOGIN;
  payload: UserType;
};

export type LogoutAction = {
  type: AuthActionType.LOGOUT;
};

export type Action = LoginSuccessAction | LogoutAction;

export type State = {
  user: UserType | null;
  isAuthenticated: boolean;
};
