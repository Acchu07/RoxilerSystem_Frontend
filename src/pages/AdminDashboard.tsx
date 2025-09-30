import {useContext, useState} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";
import {Dashboard} from "../components/Dashboard.tsx";
import RegisterUserForm from "../components/RegisterUserForm.tsx";
import {ViewUser} from "../components/ViewUser.tsx";
import {ViewStore} from "../components/ViewStore.tsx";
import RegisterStoreForm from "../components/RegisterStoreForm.tsx";


enum onlyOneIsOpenNumber {
    DASHBOARD = 0,
    REGISTERUSER = 1,
    REGISTERSTORE = 4,
    VIEWUSER = 2,
    VIEWSTORE = 3,
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
                {/*Make a reusuable navbar which accepts parameters and builds navbar dynamically*/}
                <nav className="h-full">
                    <ul className="menu bg-base-200 rounded-box w-56 h-full">
                        <li className={`p-2 m-2 ${onlyOneIsOpen === 0 ? 'bg-blue-500' : ''}`}
                            onClick={() => handleSetView(0)}><a>DASHBOARD</a></li>
                        <li className={`p-2 m-2 ${onlyOneIsOpen === 1 ? 'bg-blue-500' : ''}`}
                            onClick={() => handleSetView(1)}><a>REGISTER USER</a></li>
                        <li className={`p-2 m-2 ${onlyOneIsOpen === 4 ? 'bg-blue-500' : ''}`}
                            onClick={() => handleSetView(4)}><a>REGISTER STORE</a></li>
                        <li className={`p-2 m-2 ${onlyOneIsOpen === 2 ? 'bg-blue-500' : ''}`}
                            onClick={() => handleSetView(2)}><a>VIEW USER</a></li>
                        <li className={`p-2 m-2 ${onlyOneIsOpen === 3 ? 'bg-blue-500' : ''}`}
                            onClick={() => handleSetView(3)}><a>VIEW STORE</a></li>
                    </ul>
                </nav>
                <section className="flex-1">
                    {onlyOneIsOpen === 0 && <Dashboard data={isUserLoggedIn}/>}
                    {onlyOneIsOpen === 1 && <RegisterUserForm/>}
                    {onlyOneIsOpen === 2 && <ViewUser/>}
                    {onlyOneIsOpen === 3 && <ViewStore/>}
                    {onlyOneIsOpen === 4 && <RegisterStoreForm/>}
                </section>
            </main>
        </>
    )
}

