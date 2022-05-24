process.env.NODE_ENV = "test";
jest.mock("fs/promises");
import fs from "fs/promises";
import supertest from "supertest";

import { app, server } from "../../../app";
import mockData from "../../data/mockData.json";

const request = supertest(app);

console.error = jest.fn(); // silence log during test
console.log = jest.fn(); // silence log during test

describe("API Test", () => {
  afterAll(async () => {
    // await disconnectDb();
    server.close();
  });

  it("Success GET Partners: Get all nearby partners", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await request.get("/v1/partners?distance=500&lat=32.985364&lng=70.584130");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      error: false,
      result: [{ id: 1, offices: ["Mock Address 1"], organization: "Mock 1" }],
      status: true,
    });
  });

  it("Success GET Partners: No nearby partners", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await request.get("/v1/partners?distance=50&lat=32.985364&lng=70.584130");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      error: false,
      result: [],
      status: true,
    });
  });

  it("Fail GET Partners: Invalid query params", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await request.get("/v1/partners?distance=50&lat=32.985364&lng=370.584130");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: {
        message: 'Invalid request, "lng" must be less than or equal to 180',
        type: "ValidationError",
      },
      result: false,
      status: false,
    });
  });

  it("Fail GET Partners: Missing query params", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await request.get("/v1/partners?lat=32.985364&lng=70.584130");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: {
        message: 'Invalid request, "distance" must be a number',
        type: "ValidationError",
      },
      result: false,
      status: false,
    });
  });

  it("Fail GET Partners: Partners data invalid unexpected error", async () => {
    const TestData: Buffer = new Buffer(
      JSON.stringify({
        id: 1,
        organization: "Mock 2",
        offices: [{ address: "Mock Address 2" }],
      })
    );

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await request.get("/v1/partners?distance=50&lat=32.985364&lng=70.584130");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: {
        message: "Something went wrong.",
        type: "UnexpectedError",
      },
      result: false,
      status: false,
    });
  });
});
