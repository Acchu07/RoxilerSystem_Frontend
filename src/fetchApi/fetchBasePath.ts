export async function fetchBasePath() {
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

