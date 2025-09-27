import LoginForm from "../components/LoginForm.tsx";
import RegisterUserForm from "../components/RegisterUserForm.tsx";
import {useState} from "react";


type FormType = "login" | "register"


function AuthPage() {
    const [currentForm, setCurrentForm] = useState<FormType>("login")

    return (
        <>
            <nav className="flex justify-between m-10 p-10">
                <button className={`btn btn-xl ${currentForm === 'login'? "text-success":"btn-soft"}`} onClick={() => setCurrentForm("login")}>Login</button>
                <button className={`btn btn-xl ${currentForm === 'register'? "text-success":"btn-soft"}`} onClick={() => setCurrentForm("register")}>Register</button>
            </nav>
            <main className="flex justify-center">
                    {currentForm === 'login' && <LoginForm/>}
                {currentForm === 'register' && <RegisterUserForm/>}
            </main>

        </>
    )
}

export default AuthPage;