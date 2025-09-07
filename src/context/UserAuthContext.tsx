import {createContext} from "react";


interface UserAuthContextType {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserAuthContext = createContext<UserAuthContextType | null>(null);
