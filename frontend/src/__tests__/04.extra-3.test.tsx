import { gql, ApolloLink, execute, Observable } from "@apollo/client";
import { wait } from "@testing-library/react";
import { createAuthAfterwareLink } from "../final/04.extra-3";

const mockQuery = gql`
  query {
    foo
  }
`;

function makeRequest(link: ApolloLink) {
  execute(link, {
    query: mockQuery
  }).subscribe(() => {});
}

function createLinkThatThrows(
  statusCode: number,
  headersGetterFn: (headers: Record<string, string>) => void = () => {}
) {
  let called = 0;
  return new ApolloLink((operation) => {
    headersGetterFn(operation.getContext().headers);
    if (called == 1) return Observable.of();
    called++;

    return new Observable((observer) => {
      observer.error({ statusCode });
    });
  });
}

describe("04.extra-3 tests", () => {
  it("fetches new token when backend returns 403", async () => {
    const fetcher = jest.fn().mockResolvedValue({ token: "token" });

    const authLink = createAuthAfterwareLink(fetcher);

    let currentHeaders = {};
    const errorLink = createLinkThatThrows(
      403,
      async (headers) => (currentHeaders = headers)
    );

    const testLink = ApolloLink.from([authLink, errorLink]);
    makeRequest(testLink);

    await wait(() =>
      expect(currentHeaders).toEqual({ Authorization: "token" })
    );
    await wait(() => expect(fetcher).toHaveBeenCalled());
  });

  it("does not fetch the token then the statusCode is not 403", async () => {
    const fetcher = jest.fn().mockResolvedValue({ token: "token" });

    const authLink = createAuthAfterwareLink(fetcher);
    const errorLink = createLinkThatThrows(500, () => {});

    const testLink = ApolloLink.from([authLink, errorLink]);
    makeRequest(testLink);

    await wait(() => {});
    expect(fetcher).not.toHaveBeenCalled();
  });
});
