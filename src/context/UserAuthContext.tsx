import {createContext} from "react";

interface AuthContextObjecType{
    role: "ADMIN"| "USER" | "STORE_OWNER" | null,
    isLoggedIn: boolean,
    data: any // fix later
}

interface UserAuthContextType {
    isUserLoggedIn: AuthContextObjecType;
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<AuthContextObjecType>>;
}

export const UserAuthContext = createContext<UserAuthContextType | null>(null);

export type {AuthContextObjecType, UserAuthContextType}