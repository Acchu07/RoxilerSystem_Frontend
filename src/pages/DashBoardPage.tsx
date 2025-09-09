import {useContext, useEffect, useState} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";
import {AllErrors} from "../components/Errors.tsx";
import {AdminDashboard} from "./AdminDashboard.tsx";
import {StoreOwnerDashboard} from "../components/StoreOwnerDashboard.tsx";
import {UserDashboard} from "../components/UserDashboard.tsx";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";
import {authAPI} from "../config.ts";

export default function DashBoardPage() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("UserAuthContext not provided");
    const {isUserLoggedIn, setIsUserLoggedIn} = context;
    const [errors, setErrors] = useState<string | null>(null);

    // Quick TypeError Fix Starts here
    useEffect(() => {
        if (!isUserLoggedIn.data) {
            const requestOptions: RequestInit = {
                method: 'GET',
                credentials: 'include',
            }

            async function fetchData() {
                const fetchOutcome = await fetchURL(authAPI.dashboard, requestOptions)
                if (fetchOutcome.data) {
                    setIsUserLoggedIn({
                        ...isUserLoggedIn,
                        data: fetchOutcome.data
                    })
                }
            }

            fetchData()
        }

    })

    if (!isUserLoggedIn.data) {
        return (
            <p>Fetching Data</p>
        )
    }
    // Quick Fix Ends here

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
            <div className="relative">
                <button className="absolute top-0 right-0 btn btn-outline btn-primary" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {isUserLoggedIn.role === "ADMIN" && <AdminDashboard/>}
            {isUserLoggedIn.role === "STORE_OWNER" && <StoreOwnerDashboard/>}
            {isUserLoggedIn.role === "USER" && <UserDashboard/>}
        </main>
    )
}