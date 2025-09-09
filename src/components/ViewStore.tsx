import {useEffect, useState} from "react";
import {authAPI} from "../config.ts";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";
import {AllErrors} from "./Errors.tsx";
import {ViewTable} from "./View.tsx";

export function ViewStore() {
    const [userData, setUserData] = useState<any[]>([]);
    const [errorsPresent, setErrorsPresent] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchURL(authAPI.getAllStores, {
                    method: 'GET',
                    credentials: 'include',
                });
                setUserData(response.data);
                console.log(
                    response.data
                )
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
            {userData && <ViewTable userData={userData}/>}
            {errorsPresent && <AllErrors errors={errorsPresent} setErrors={setErrorsPresent}/>}
        </div>
    )
}