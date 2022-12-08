import { DEFAULT_API_KEY_HEADER } from '../constants';
import { AuthenticationOptions, AuthenticationType, AuthenticationTypes } from '../interfaces';

const basicConfig = {
  securityDefinitions: {
    basicAuth: {
      type: 'basic',
    },
  },
  security: [{ basicAuth: [] }],
};

const apiKeyConfig = (keyName: string) => ({
  security: [{ APIKeyHeader: [] }],
  securityDefinitions: {
    APIKeyHeader: {
      type: 'apiKey',
      name: keyName,
      in: 'header',
    },
  },
});

export const getAuthentication = (type?: AuthenticationType, options?: AuthenticationOptions) => {
  switch (type) {
    case AuthenticationTypes.BASIC:
      return basicConfig;
    case AuthenticationTypes.API_KEY:
      return apiKeyConfig(options?.apiKeyHeaderName || DEFAULT_API_KEY_HEADER);
    default:
      return {};
  }
};
