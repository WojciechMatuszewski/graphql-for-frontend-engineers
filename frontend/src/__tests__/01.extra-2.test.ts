import { httpLink } from "../final/01.extra-2";

describe("01.extra-2 httpLink test", () => {
  it("refers to the correct URI", () => {
    console.log(httpLink);
    expect(httpLink.options.uri).toBe("http://localhost:4000/graphql");
  });
});
