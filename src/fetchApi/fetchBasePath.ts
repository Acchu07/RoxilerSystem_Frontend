export interface fetchData {
    message: string;
    role?: "ADMIN" | "USER" | "STORE_OWNER" | null;
    data?: any // List out types i am returning from the API - fix later
    user?:{
        name:string,
        email:string,
    }
}

// Making this generic will solve a lot of type issues - look into later
export async function fetchURL(url:string,RequestOptions:RequestInit) {

    const response = await fetch(url, RequestOptions);
    const data: fetchData = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data
}

