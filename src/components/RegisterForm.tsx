import {authAPI, validationValues} from "../config.ts";
import {AllErrors} from "./Errors.tsx";
import type {SubmitHandler} from "react-hook-form";
import type {fetchData} from "../fetchApi/fetchBasePath.ts";
import {useForm} from "react-hook-form";
import {useRef, useState} from "react";
import {fetchURL} from "../fetchApi/fetchBasePath.ts";


interface IFormInput {
    name: string;
    address: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface registrationSuccess extends fetchData {
    message: string;
    user: {
        name: string;
        email: string;
    }
}

function RegisterForm() {
    const [errorsPresent, setErrorsPresent] = useState<string | null>(null);
    const [notification, setNotification] = useState<registrationSuccess | null>(null);
    // Need Is Loading to prevent multiple clicks on register and login button
    let timerRef = useRef<number | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<IFormInput>();

    // Formstate errors should probably have a length property on this look up docs later
    const isButtonEnabled = errors.name || errors.address || errors.email || errors.password ? true : false;

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include',
        }

        try {
            const fetchOutcome = (await fetchURL(authAPI.register, requestOptions)) as registrationSuccess; // Bad make function generic to do later
            if (fetchOutcome) {
                reset();
                setNotification({
                    message: fetchOutcome.message,
                    user: {
                        name: fetchOutcome.user.name,
                        email: fetchOutcome.user.email,
                    }
                })
                timerRef.current = setTimeout(() =>
                        setNotification(null)
                    , 3000)
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorsPresent(error.message)
            } else {
                console.log(error);
            }
        }
    };
    if (notification) {
        return (
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">{notification.message}</h2>
                    <p>{notification.user.name}</p>
                    <p>{notification.user.email}</p>

                </div>
            </div>
        )
    }


// Individual input elements could be a reusuable component - TO check later?
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex gap-4">
                <label className="floating-label">
                    <span>Name</span>

                    <input className={`input input-lg ${errors?.name ? "input-error" : "input-success"}`} type="text"
                           placeholder="Name"
                           {...register("name", {
                               required: true,
                               minLength: validationValues.minLengthName,
                               maxLength: validationValues.maxLengthName
                           })}
                    />
                    {errors?.name?.type === "required" && <p className="text-error">Required Field</p>}
                    {errors?.name?.type === "minLength" && (
                        <p className="text-error">Min Length is {validationValues.minLengthName}</p>
                    )}
                    {errors?.name?.type === "maxLength" && (
                        <p className="text-error">Max Length is {validationValues.maxLengthName}</p>
                    )}
                </label>
            </section>

            <section className="flex gap-4">
                <label className="floating-label">
                    <span>Address</span>

                    <input className={`input input-lg ${errors?.address ? "input-error" : "input-success"}`} type="text"
                           placeholder="Address"
                           {...register("address", {
                               required: true,
                               minLength: validationValues.minLengthAddress,
                               maxLength: validationValues.maxLengthAddress
                           })}
                    />
                    {errors?.address?.type === "required" && <p className="text-error">Required Field</p>}
                    {errors?.address?.type === "minLength" &&
                        <p className="text-error"> MinLength is {validationValues.minLengthAddress}</p>}
                    {errors?.address?.type === "maxLength" &&
                        <p className="text-error"> MinLength is {validationValues.maxLengthAddress}</p>}
                </label>
            </section>

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

            <section className="flex gap-4">
                <label className="floating-label">
                    <span>Password</span>
                    <input className={`input input-lg ${errors?.email ? "input-error" : "input-success"}`}
                           type="password"
                           placeholder="Password" {...register("password", {
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
            <button className={`btn btn-xl `} type="submit" disabled={isButtonEnabled}> Register</button>
            {errorsPresent && <AllErrors errors={errorsPresent} setErrors={setErrorsPresent}/>}
        </form>
    );
}

export default RegisterForm