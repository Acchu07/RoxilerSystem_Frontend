import {useEffect, useState} from 'react'
import {UserAuthContext} from "./context/UserAuthContext.tsx";
import './App.css'
import AuthPage from "./pages/AuthPage.tsx";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        // fetchBasePath();
    }, []);

    return (
        <>
            <UserAuthContext.Provider value={{isUserLoggedIn, setIsUserLoggedIn}}>
                {isUserLoggedIn ? <p>Logged In</p> : <AuthPage/>}
            </UserAuthContext.Provider>
        </>
  )
}

export default App
