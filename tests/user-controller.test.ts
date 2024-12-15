// tests/api.spec.ts
import {test, expect} from '@playwright/test';
import {ApiClient} from "../src/api-client";
import {StatusCodes} from "http-status-codes";

let baseURL: string = 'http://localhost:3000/users';

let userID: number;

test.beforeAll(async ({request}) => {
    const response = await request.post(`${baseURL}`);
    const body = await response.json();
    userID = body.id
});

//new lesson
test.afterAll(async ({request}) => {
    // get all users
    const response = await request.get(`${baseURL}`);
    const responseBody = await response.json()
    // get the number of objects in the array returned
    const numberOfObjects = responseBody.length;

    // create an empty array to store all user ID
    let userIDs = [];

    // loop through all users and store their ID in an array
    for (let i = 0; i < numberOfObjects; i++) {
        // get user ID from the response
        let userID = responseBody[i].id;
        // push is used to add elements to the end of an array
        userIDs.push(userID);
    }

    // delete all users in a loop using previously created array
    for (let i = 0; i < numberOfObjects; i++) {
        // delete user by id
        let response = await request.delete(`${baseURL}/${userIDs[i]}`);
        // validate the response status code
        expect.soft(response.status()).toBe(StatusCodes.OK);
    }

    // verify that all users are deleted
    const responseAfterDelete = await request.get(`${baseURL}`);
    expect(responseAfterDelete.status()).toBe(200);
    const responseBodyEmpty = await responseAfterDelete.text()
    // validate that the response is an empty array
    expect(responseBodyEmpty).toBe('[]');
})


test.describe('User management API', () => {

    test('GET /:id - should return a user by ID', async ({request}) => {
        const response = await request.get(`${baseURL}` + "/" + userID)
        const responseBody = await response.text()
        console.log(responseBody)
        expect(response.status()).toBe(StatusCodes.OK)
    });

    test('GET /:id - should return 404 if user not found', async ({request}) => {
        const response = await request.get(`${baseURL}` + "/" + 123)
        expect(response.status()).toBe(StatusCodes.NOT_FOUND)
    });

    test('POST / - should add a new user', async ({request}) => {
        const response = await request.post(`${baseURL}`);
        const body = await response.json();
        expect.soft(response.status()).toBe(StatusCodes.CREATED)
        expect.soft(body.id).toBeDefined()
    });

    test('DELETE /:id - should delete a user by ID', async ({request}) => {
        const response = await request.delete(`${baseURL}` + "/" + userID)
        const responseBody = await response.json()
        console.log(responseBody)
        expect.soft(response.status()).toBe(StatusCodes.OK)
        expect.soft(responseBody[0].id).toBe(userID)
    });

    test('DELETE /:id - should return 404 if user not found', async ({request}) => {
        const response = await request.delete(`${baseURL}` + "/" + 123)
        const responseBody = await response.json()
        console.log(responseBody)
        expect.soft(response.status()).toBe(StatusCodes.NOT_FOUND)
    });

    //new lesson test
    test('POST create n users', async ({request}) => {
        const apiClient = await ApiClient.getInstance(request)
        const userCount = await apiClient.createUsers(5)
        const response = await request.get(`${baseURL}`);
        const responseBody = await response.json()
        let numberOfObjects = responseBody.length
        expect(numberOfObjects).toBe(6) //one more user was created in test('POST / - should add a new user')

    });

    test('DELETE n users', async ({request}) => {
        //const apiClient = await ApiClient.getInstance(request)
        //const usersCount = await apiClient.createUsers(5)//create new users if users absent before test
        let userIDs = [];
        const response = await request.get(`${baseURL}`);
        const responseBody = await response.json()
        // get the number of objects in the array returned
        const numberOfObjects = responseBody.length;
        expect(numberOfObjects).toBeGreaterThan(1)
        // loop through all users and store their ID in an array
        for (let i = 0; i < numberOfObjects; i++) {
            // get user ID from the response
            let userID = responseBody[i].id;
            // push is used to add elements to the end of an array
            userIDs.push(userID);
        }
        for (let i = 0; i < numberOfObjects; i++) {
            // delete user by id
            let response = await request.delete(`${baseURL}/${userIDs[i]}`);
            // validate the response status code
        }
        const expectResponse = await request.get(`${baseURL}`);
        const expectResponseBody = await expectResponse.json()
        expect(expectResponseBody).toStrictEqual([])
    });
});