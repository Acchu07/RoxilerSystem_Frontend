import {useEffect, useState} from 'react'
import type {AuthContextObjecType} from "./context/UserAuthContext.tsx";
import {UserAuthContext} from "./context/UserAuthContext.tsx";
import './App.css'
import AuthPage from "./pages/AuthPage.tsx";
import DashBoardPage from "./pages/DashBoardPage.tsx";
import {fetchURL} from "./fetchApi/fetchBasePath.ts";
import {authAPI} from "./config.ts";


function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<AuthContextObjecType>({
        role:null,
        isLoggedIn: false,
        data: null
    });
    useEffect(() => {
        const requestOptions: RequestInit = {
            method: 'GET',
            credentials: 'include',
        }
        async function fetchData() {
            const fetchOutcome = await fetchURL(authAPI.dashboard, requestOptions)

            if(fetchOutcome.role){
                setIsUserLoggedIn({
                    role: fetchOutcome.role,
                    isLoggedIn: true,
                    data: fetchOutcome.data
                })
            }
        }
        fetchData()

    },[]);



    return (
        <>
            <UserAuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn}}>
                {isUserLoggedIn.isLoggedIn ? <DashBoardPage/> : <AuthPage/>}
            </UserAuthContext.Provider>
        </>
  )
}

export default App
