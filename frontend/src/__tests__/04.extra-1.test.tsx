import { execute, gql, ApolloLink, Observable } from "@apollo/client";
import { getMockAuthorizationToken } from "../apollo/Provider";
import { authMiddlewareLink } from "../final/04.extra-1";

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

describe("04.extra-1 test", () => {
  it("sets the `Authorization` header while preserving previous headers", () => {
    // this link just sets headers so that we can test that our link preserves them
    const prevHeaders = {
      "X-User": "premium",
      "X-Department": "technology"
    };
    const prevLink = new ApolloLink((operation, forward) => {
      operation.setContext({ headers: prevHeaders });
      return forward(operation);
    });

    // this is the terminating link which is used for assertions
    const afterLink = new ApolloLink((operation, forward) => {
      expect(operation.getContext().headers).toEqual({
        ...prevHeaders,
        Authorization: getMockAuthorizationToken()
      });

      // the operation is not defined since it's the last link in the chain
      return Observable.of();
    });

    const combinedLink = ApolloLink.from([
      prevLink,
      authMiddlewareLink,
      afterLink
    ]);

    makeRequest(combinedLink);
  });
});
