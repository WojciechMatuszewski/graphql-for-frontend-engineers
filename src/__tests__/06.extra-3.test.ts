import {
  gql,
  ApolloLink,
  execute,
  Observable,
  Operation
} from "@apollo/client";
import { wait } from "@testing-library/react";
import { createAuthAfterwareLink } from "../final/06.extra-3";

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
  const operationFN = jest
    .fn<any, [Operation]>()
    .mockImplementationOnce(() => {
      return new Observable((observer) => observer.error({ statusCode }));
    })
    .mockImplementationOnce((operation) => {
      headersGetterFn(operation.getContext().headers);
      return Observable.of();
    });

  return new ApolloLink(operationFN);
}

describe("06.extra-3 tests", () => {
  it("fetches new token when backend returns 401", async () => {
    const fetcher = jest.fn().mockResolvedValue({ token: "token" });

    const authLink = createAuthAfterwareLink(fetcher);

    let currentHeaders = {};
    const errorLink = createLinkThatThrows(
      401,
      async (headers) => (currentHeaders = headers)
    );

    const testLink = ApolloLink.from([authLink, errorLink]);
    makeRequest(testLink);

    await wait(() =>
      expect(currentHeaders).toEqual({ Authorization: "token" })
    );
    await wait(() => expect(fetcher).toHaveBeenCalled());
  });

  it("does not fetch the token then the statusCode is not 401", async () => {
    const fetcher = jest.fn().mockResolvedValue({ token: "token" });

    const authLink = createAuthAfterwareLink(fetcher);
    const errorLink = createLinkThatThrows(500);

    const testLink = ApolloLink.from([authLink, errorLink]);
    makeRequest(testLink);

    await wait(() => {});
    expect(fetcher).not.toHaveBeenCalled();
  });
});
