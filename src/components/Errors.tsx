import {useEffect} from "react";


export function AllErrors({errors,setErrors}: {errors: string | null, setErrors: React.Dispatch<React.SetStateAction<string | null>>}) {
    useEffect(() => {
        const clearTimer = setTimeout(()=>{
            setErrors(null)
        }, 3000)
        return () => {
            clearTimeout(clearTimer)
        }
    },[errors])
    return (
        <>
            <p className="text-error">{errors}</p>
        </>
    )
}