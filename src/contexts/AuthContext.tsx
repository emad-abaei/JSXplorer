import { createContext, useContext, ReactNode, useReducer } from "react";
import { FAKE_USER } from "../utils/constants";
import {
  Action,
  AuthActionType,
  AuthContextType,
  State
} from "../types/authContextTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState = {
  user: null,
  isAuthenticated: false
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { ...state, isAuthenticated: true, user: action.payload };

    case AuthActionType.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Unknown action type");
  }
}

interface AuthContextProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthContextProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: AuthActionType.LOGIN, payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: AuthActionType.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined)
    throw new Error("useAuth must be used within the AuthProvider");

  return ctx;
}

export { AuthProvider, useAuth };
