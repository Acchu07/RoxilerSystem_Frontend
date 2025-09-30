import {useContext, useState} from "react";
import {UserAuthContext} from "../context/UserAuthContext.tsx";

export function UserDashboard() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("UserAuthContext not provided");
    const {isUserLoggedIn} = context;

    const [onlyOneIsOpen, setOnlyOneIsOpen] = useState<number>(0);

    return (
        <>
            <main className="flex flex-row gap-4 h-screen">
                {/*Make a reusuable navbar which accepts parameters and builds navbar dynamically*/}
                <nav className="h-full">
                    <ul className="menu bg-base-200 rounded-box w-56 h-full">
                        <li onClick={() => setOnlyOneIsOpen(0)}>User Dashboard</li>
                        <li onClick={() => setOnlyOneIsOpen(1)}>View Store</li>
                    </ul>
                </nav>
                <section className="flex-1">
                    {onlyOneIsOpen === 0 && <p>User Dash</p>}
                    {onlyOneIsOpen === 1 && <p>User View</p>}
                </section>
            </main>
        </>
    )
}
