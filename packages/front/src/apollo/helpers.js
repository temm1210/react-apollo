export const setContextHeader = (operation, property) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      ...property,
    },
  }));
};
