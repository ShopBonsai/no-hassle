enum AuthenticationType {
  BASIC = 'basic',
}

const basicConfig = {
  securityDefinitions: {
    basicAuth: {
      type: 'basic',
    },
  },
  security: [{ basicAuth: [] }],
};

const authenticationConfiguration = {
  [AuthenticationType.BASIC]: basicConfig,
};

export const getAuthentication = (type?: 'basic') => authenticationConfiguration[type];
