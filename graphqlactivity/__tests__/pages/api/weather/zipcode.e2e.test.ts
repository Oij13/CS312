/**
 * @jest-environment node
 */

describe("The api /v1/weather/[zipcode]", () => {
  test("returns the correct data for the zipcode 96815", async () => {
    const zip = "96815";
    let response = await fetch(`http://localhost:3000/api/${zip}`);
    let body = await response.json();
    expect(body.zip).toEqual(zip);
  });
});

export {};
