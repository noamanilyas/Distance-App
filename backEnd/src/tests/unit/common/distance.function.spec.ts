process.env.NODE_ENV = "test";
import { sphereDistance } from "../../../common/distance.function";

console.error = jest.fn(); // silence log during test
console.log = jest.fn(); // silence log during test

describe("Sphere distance function tests", () => {
  it("Success: Should retrun correct distance with positive coordinates", async () => {
    const p1 = [32.985364, 70.58413];
    const p2 = [25.81872, 64.500846];

    const correctResult = 991;

    const distance = sphereDistance(p1, p2);
    expect(distance).toEqual(correctResult);
  });

  it("Success: Should retrun correct distance with negative coordinates", async () => {
    const p1 = [-43.981786, -90.143647];
    const p2 = [-43.150727, -57.820559];

    const correctResult = 2589;

    const distance = sphereDistance(p1, p2);
    expect(distance).toEqual(correctResult);
  });
});
