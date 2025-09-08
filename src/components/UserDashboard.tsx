import {useContext} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";

export function UserDashboard() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("UserAuthContext not provided");
    const {isUserLoggedIn} = context;

    return (
        <>
            <p>{`${isUserLoggedIn.role} Dashboard`}</p>
        </>
    )
}