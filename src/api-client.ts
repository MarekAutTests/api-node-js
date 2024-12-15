import {APIRequestContext} from 'playwright'
import {StatusCodes} from "http-status-codes";

let baseURL: string = 'http://localhost:3000/users';

export class ApiClient {
    static instance: ApiClient
    private request: APIRequestContext

    private constructor(request: APIRequestContext) {
        this.request = request
    }

    public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient(request)

        }
        return ApiClient.instance
    }

    async getUserById(userId: number): Promise<any | null> {
        const response = await this.request.get(`${baseURL}/${userId}`);
        if (response.status() === StatusCodes.NOT_FOUND) {
            return null;
        }
        return response.json()
    }

    async getAllUsers(): Promise<any[]> {
        const response = await this.request.get(baseURL);
        return response.json()
    }

    async createUsers(users: number): Promise<number> {
        for (let i = 0; i < users; i++) {
            const response = await this.request.post(baseURL)
        }
        return users
    }

    async deleteUserById(userId: number): Promise<void> {
        const response = await this.request.delete(`${baseURL}/${userId}`);
    }

    async deleteAllUsers(): Promise<void> {
        const users = await this.getAllUsers();
        for (const user of users) {
            await this.deleteUserById(user.id);
        }
    }
}