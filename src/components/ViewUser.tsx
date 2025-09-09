import {useEffect, useState} from "react";
import {authAPI} from "../config.ts";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";
import {AllErrors} from "./Errors.tsx";

export function ViewUser() {
    const [userData, setUserData] = useState<any[]>([]);
    const [errorsPresent, setErrorsPresent] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchURL(authAPI.getAllUsers, {
                    method: 'GET',
                    credentials: 'include',
                });
                setUserData(response.data);
                // console.log(
                //     response.data
                // )
            } catch (error) {
                if (error instanceof Error) {
                    setErrorsPresent(error.message)
                } else {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex w-full flex-col">
            <p className="text-3xl p-2 m-2">View Users</p>
            <div className="divider"></div>
            {!userData && <p>Fetching Data</p>}
            {userData &&
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData && userData.map(userObject => {
                            return (
                                <tr key={userObject.id} className="hover:bg-base-300">
                                    <td>{userObject.id}</td>
                                    <td>{userObject.name}</td>
                                    <td>{userObject.email}</td>
                                    <td>{userObject.address}</td>
                                    <td>{userObject.role}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>}
            {errorsPresent && <AllErrors errors={errorsPresent} setErrors={setErrorsPresent}/>}
        </div>
    )
}