import axios, { AxiosResponse } from "axios";

interface InteractionData {
    uuid: string;
    interactionId: string;
    promptId: string;
    prompt: string;
    id: string;
    message: string;
    profaned: string;
    disclaimer: string;
}

type ApiResponse  = {
    code: number;
    data?: InteractionData;
    HttpStatus: 'OK' | 'UNAUTHORIZED';
    timestamp: number;
    status: 'success' | 'error';
    error?: string;
    message?: string;
}

export default class Krutrim {
    private readonly authorization: string;
    private readonly headers: Record<string, string>;

    constructor(authorization: string) {
        this.authorization = authorization;
        this.headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            "Authorization": authorization,
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        };
    }

    async chatCompletion(prompt: string, intersectionId: string | null = null): Promise<ApiResponse> {
        const payload: { message: string, intersectionId?: string } = { message: prompt };

        if (intersectionId) {
            payload.intersectionId = intersectionId;
        }

        try {
            const res: AxiosResponse = await axios.post("https://chat.olakrutrim.com/chatapp/chat", payload, {
                headers: this.headers
            });
            return res.data;

        } catch (error) {
            console.error('Error occurred during chat completion:', error);
            throw error;
        }
    }
}
