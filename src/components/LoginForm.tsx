import {useForm} from "react-hook-form"
import {authAPI, validationValues} from "../config.ts"
import {UserAuthContext} from "../context/UserAuthContext.tsx";
import {useContext, useState} from "react";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";
import {AllErrors} from "./Errors.tsx";

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

function LoginForm () {
    const contextIsUserLogged = useContext(UserAuthContext);
    const [errorsPresent, setErrorsPresent] = useState<string | null>(null);
    if (!contextIsUserLogged) throw new Error("UserAuthContext not provided");
    const { setIsUserLoggedIn } = contextIsUserLogged;


    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInput>();

    const onSubmit = async (data: IFormInput) => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        }
        try{
            const fetchOutcome = await fetchURL(authAPI.login, requestOptions)
            if(!fetchOutcome.role){
                throw new Error("Role not found")
            }
            setIsUserLoggedIn({
                role: fetchOutcome.role,
                isLoggedIn: true,
                data: null
            })
        }
        catch (error) {
            if(error instanceof Error) {
                setErrorsPresent(error.message)
            }
            else {
                console.log(error);
            }

        }

    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex gap-4">
                <label className="floating-label">
                    <span>Email Address</span>

                    <input className={`input input-lg ${errors?.email ? "input-error" : "input-success"}`} type="email"
                           placeholder="Email Address"
                           {...register("email", {
                               required: true,
                               pattern: validationValues.emailPattern
                           })}
                    />
                    {errors?.email?.type === "required" && <p className="text-error">Required Field</p>}
                    {errors?.email?.type === "pattern" && <p className="text-error">Not Valid Email</p>}
                </label>
            </section>

            <section>
                <label className="floating-label">
                    <span>Password</span>
                    <input className={`input input-lg ${errors?.email ? "input-error" : "input-success"}`} type="password" placeholder="Password" {...register("password", {
                        required: true,
                        pattern: validationValues.passwordPattern,
                        minLength: validationValues.minLengthPassword,
                        maxLength: validationValues.maxLengthPassword
                    })} />
                    {errors?.password?.type === "required" && <p className="text-error">Required Field</p>}
                    {errors?.password?.type === "pattern" && (
                        <p className="text-error">Missing UpperCase or Special Character</p>
                    )}
                    {errors?.password?.type === "minLength" && (
                        <p className="text-error">Min Length is {validationValues.minLengthPassword}</p>
                    )}
                    {errors?.password?.type === "maxLength" && (
                        <p className="text-error">Max Length is {validationValues.maxLengthPassword}</p>
                    )}
                </label>
            </section>
            <button className={`btn btn-xl `} disabled={errors?.email || errors?.password ? true : false} type="submit"> Login </button>
            {errorsPresent && <AllErrors errors={errorsPresent} setErrors={setErrorsPresent}/>}
        </form>
    );
}

export default LoginForm