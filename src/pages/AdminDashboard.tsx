import {useContext, useState} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";
import {Dashboard} from "../components/Dashboard.tsx";
import RegisterForm from "../components/RegisterForm.tsx";


enum onlyOneIsOpenNumber {
    DASHBOARD = 0,
    REGISTERUSER = 1,
    VIEWUSER = 2,
}

export function AdminDashboard() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("UserAuthContext not provided");
    const {isUserLoggedIn} = context;
    const [onlyOneIsOpen, setOnlyOneIsOpen] = useState<onlyOneIsOpenNumber>(0);

    function handleSetView(view: onlyOneIsOpenNumber) {
        setOnlyOneIsOpen(view)
    }

    return (
        <>
            <main className="flex flex-row gap-4 h-screen">
                <nav className="h-full">
                    <ul className="menu bg-base-200 rounded-box w-56 h-full">
                        <li onClick={() => handleSetView(0)}><a>DASHBOARD</a></li>
                        <li onClick={() => handleSetView(1)}><a>REGISTER USER</a></li>
                        <li onClick={() => handleSetView(2)}><a>VIEW USER</a></li>
                    </ul>
                </nav>
                <section className="flex-1">
                    {onlyOneIsOpen === 0 && <Dashboard data={isUserLoggedIn}/>}
                    {onlyOneIsOpen === 1 && <RegisterForm/>}
                    {onlyOneIsOpen === 2 && <p>View User</p>}
                </section>
            </main>
        </>
    )
}