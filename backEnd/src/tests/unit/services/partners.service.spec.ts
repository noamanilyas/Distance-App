process.env.NODE_ENV = "test";
jest.mock("fs/promises");
import fs from "fs/promises";
import mockData from "../../data/mockData.json";
import { getNearByPartnersService } from "../../../services/partners.service";

console.error = jest.fn(); // silence log during test
console.log = jest.fn(); // silence log during test

describe("Sphere distance function tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Success: Should return correct partners", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await getNearByPartnersService({
      distance: 1000,
      lat: 27.977238,
      lng: 66.06276,
    });

    expect(res).toEqual([
      { id: 1, offices: ["Mock Address 1"], organization: "Mock 1" },
      { id: 2, offices: ["Mock Address 2"], organization: "Mock 2" },
    ]);
  });

  it("Success: Should return no partners", async () => {
    const TestData: Buffer = new Buffer(JSON.stringify(mockData));

    fs.readFile = jest.fn().mockReturnValue(TestData);

    const res = await getNearByPartnersService({
      distance: 10,
      lat: 27.977238,
      lng: 66.06276,
    });

    expect(res).toEqual([]);
  });

  it("Failed: Should throw error", async () => {
    const TestData: Buffer = new Buffer(
      JSON.stringify({
        id: 1,
        organization: "Mock 2",
        offices: [{ address: "Mock Address 2" }],
      })
    );

    fs.readFile = jest.fn().mockReturnValue(TestData);

    await expect(
      getNearByPartnersService({
        distance: 100,
        lat: 300,
        lng: 700,
      })
    ).rejects.toThrowError("Something went wrong.");
  });
});
