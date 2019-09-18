export const getAuthentication = (type?: 'basic') => {
  switch (type) {
    case 'basic':
      return {
        securityDefinitions: {
          basicAuth: {
            type: 'basic',
          },
        },
        security: [{ basicAuth: [] }],
      };
    default:
      return {};
  }
};
