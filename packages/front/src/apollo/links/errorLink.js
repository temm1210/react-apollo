import { Observable, execute } from "apollo-link";
import { onError } from "apollo-link-error";
import httpLink from "./httpLink";

import { setContextHeader } from "../helpers";
import { getTokenOperation } from "../constant";

export default onError(
  // eslint-disable-next-line consistent-return
  ({ graphQLErrors, operation, networkError, forward }) => {
    const isWindow = typeof sessionStorage !== "undefined";
    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (graphQLErrors) {
      switch (graphQLErrors[0].extensions.code) {
        case "UNAUTHENTICATED": {
          console.log("JWT EXPIRED");
          return new Observable(observer => {
            execute(httpLink, getTokenOperation.operation).subscribe({
              next: ({ data }) => {
                const { access_token, refresh_token } = data[
                  getTokenOperation.name
                ];

                if (isWindow) {
                  sessionStorage.setItem("access_token", access_token);
                  sessionStorage.setItem("refresh_token", refresh_token);

                  setContextHeader(operation, {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "access_token",
                    )}`,
                  });
                }

                return forward(operation).subscribe(observer);
              },
              error: error => console.log(`${error}`),
            });
          });
        }

        case "FORBIDDEN": {
          if (isWindow) return window.alert("YOU HAVE TO LOGIN");
          return null;
        }
        default: {
          return forward(operation);
        }
      }
    }
  },
);
