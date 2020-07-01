import { httpLink } from "../final/01.extra-2";
import { getBackendURI } from "../utils/backend";

describe("01.extra-2 httpLink test", () => {
  it("refers to the correct URI", () => {
    expect(httpLink.options.uri).toBe(getBackendURI());
  });
});
