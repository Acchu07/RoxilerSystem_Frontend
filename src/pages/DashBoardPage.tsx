import {useContext, useState} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";
import {AllErrors} from "../components/Errors.tsx";
import {AdminDashboard} from "../components/AdminDashboard.tsx";
import {StoreOwnerDashboard} from "../components/StoreOwnerDashboard.tsx";
import {UserDashboard} from "../components/UserDashboard.tsx";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";
import {authAPI} from "../config.ts";

export default function DashBoardPage() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("UserAuthContext not provided");
    const {isUserLoggedIn, setIsUserLoggedIn} = context;
    const [errors, setErrors] = useState<string | null>(null);


    const handleLogout = async () => {
        const requestOptions: RequestInit = {
            method: 'POST',
            credentials: 'include',
        }
        await fetchURL(authAPI.logout, requestOptions)
        setIsUserLoggedIn({
            role: null,
            isLoggedIn: false,
            data: null,
        })
    }

    return (
        <main>
            {errors && <AllErrors errors={errors} setErrors={setErrors}/>}
            <header>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </header>
            {isUserLoggedIn.role === "ADMIN" && <AdminDashboard/>}
            {isUserLoggedIn.role === "STORE_OWNER" && <StoreOwnerDashboard/>}
            {isUserLoggedIn.role === "USER" && <UserDashboard/>}
        </main>
    )
}