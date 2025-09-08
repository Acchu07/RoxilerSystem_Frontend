import {validationValues} from "../config.ts";
import {AllErrors} from "./Errors.tsx";
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {useState} from "react";

interface IFormInput {
    name: string;
    address: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function RegisterForm() {
    const [errorsPresent, setErrorsPresent] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        alert(JSON.stringify(data))
    }

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
            <button className={`btn btn-xl `} type="submit"> Register </button>
            {errorsPresent && <AllErrors errors={errorsPresent} setErrors={setErrorsPresent}/>}
        </form>
    );
}

export default RegisterForm