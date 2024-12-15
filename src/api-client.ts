import {APIRequestContext} from 'playwright'

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

    async createUsers(users: number): Promise<number> {
        for (let i = 0; i < users; i++) {
            const response = await this.request.post(baseURL)
        }
        return users
    }
}