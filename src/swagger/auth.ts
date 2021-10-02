enum AuthenticationType {
  BASIC = 'basic',
}

const basicConfig = {
  securitySchemes: {
    basicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  security: [{ basicAuth: [] }],
};

const authenticationConfiguration = {
  [AuthenticationType.BASIC]: basicConfig,
};

export const getAuthentication = (type?: 'basic') => authenticationConfiguration[type];
