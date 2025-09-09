export const validationValues = {
    emailPattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    // passwordPattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]+$/,
    passwordPattern: /[A-Za-z]/,
    minLengthPassword: 2,
    maxLengthPassword: 16,
    minLengthName: 2,
    maxLengthName: 16,
    minLengthAddress: 2,
    maxLengthAddress: 16,
}


export const baseURL: string = import.meta.env.VITE_BASE_URL;
export const authAPI = {
    login: `${baseURL}/api/v1/auth/login`,
    register: `${baseURL}/api/v1/auth/register`,
    logout: `${baseURL}/api/v1/auth/logout`,
    dashboard: `${baseURL}/api/v1/dashboard`,
    getAllUsers: `${baseURL}/api/v1/users`,
}