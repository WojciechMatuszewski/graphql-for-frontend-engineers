import { httpLink } from "../final/01.extra-2";
import { getBackendGraphQLURI } from "../apollo/Provider";

describe("01.extra-2 httpLink test", () => {
  it("refers to the correct URI", () => {
    expect(httpLink.options.uri).toBe(getBackendGraphQLURI());
  });
});
