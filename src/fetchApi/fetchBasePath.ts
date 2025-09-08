interface fetchData {
    message: string;
    role?: "ADMIN" | "USER" | "STORE_OWNER" | null;
    data?: any // List out types i am returning from the API - fix later
}

export async function fetchURL(url:string,RequestOptions:RequestInit) {

    const response = await fetch(url, RequestOptions);
    const data: fetchData = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data
}

