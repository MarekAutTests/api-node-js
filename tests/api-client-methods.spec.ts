import {test, expect, APIRequestContext} from '@playwright/test';
import {ApiClient} from "../src/api-client";
import {StatusCodes} from "http-status-codes";

let apiClient: ApiClient;
let request: APIRequestContext;

let baseURL: string = 'http://localhost:3000/users';

test.describe('Independent tests for api-client methods', () => {
    test.beforeEach(async ({request}) => {
        apiClient = await ApiClient.getInstance(request)
        await apiClient.deleteAllUsers()
    });

    test('Create users and take user info by id', async () => {
        await apiClient.createUsers(5)
        const users = await apiClient.getAllUsers()
        const randomUser = users[Math.floor(Math.random() * 5)]
        const user = await apiClient.getUserById(randomUser.id)
        expect(user).not.toBeNull()
        expect.soft(user.id).toBe(randomUser.id)
        expect.soft(user.name).toBe(randomUser.name)
        expect.soft(user.email).toBe(randomUser.email)
        expect.soft(user.phone).toBe(randomUser.phone)
    });

    test('Check that response for user with incorrect format returned null', async () => {
        const userId = -111
        const user = await apiClient.getUserById(userId);
        expect(user).toBeNull();
    });

    test('check count of users after creation', async () => {
        let usersBefore = await apiClient.getAllUsers()
        await apiClient.createUsers(5)
        let usersAfter = await apiClient.getAllUsers()
        expect(usersAfter.length - usersBefore.length ).toBe(5)
    });

    test('Delete user by ID', async () => {
        await apiClient.createUsers(5)
        let users = await apiClient.getAllUsers()
        const randomUser = users[Math.floor(Math.random() * 5)]
        await apiClient.deleteUserById(randomUser.id);
        const user = await apiClient.getUserById(randomUser.id);
        expect(user).toBeNull();
        users = await apiClient.getAllUsers()
        expect(users.length).toBe(4)
    });

    test('should delete all users', async () => {
        await apiClient.createUsers(5)
        await apiClient.deleteAllUsers();
        const users = await apiClient.getAllUsers();
        expect(users.length).toBe(0);
    });
})