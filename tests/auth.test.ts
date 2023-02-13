import { AuthenticationTypes, SecurityDefinition, BasicSecurityDefinition } from '../src';
import { getAuthentication } from '../src/swagger/auth';

const BASIC_AUTH_ID = 'BasicAuth';
const API_KEY_AUTH_ID_1 = 'APIKeyHeader';
const API_KEY_AUTH_ID_2 = 'APIKeyHeader2';
const API_KEY_HEADER_1 = 'X-API-KEY';
const API_KEY_HEADER_2 = 'X-API-KEY-2';

const basicSecurityDefinition: BasicSecurityDefinition = {
  id: BASIC_AUTH_ID,
  type: AuthenticationTypes.BASIC,
};
const apiKeySecurityDefinition1 = {
  id: API_KEY_AUTH_ID_1,
  type: AuthenticationTypes.API_KEY,
  header: API_KEY_HEADER_1,
};
const apiKeySecurityDefinition2 = {
  id: API_KEY_AUTH_ID_2,
  type: AuthenticationTypes.API_KEY,
  header: API_KEY_HEADER_2,
};

describe('getAuthentication', () => {
  it('should return basic auth config', () => {
    const securityDefinitions: SecurityDefinition[] = [
      basicSecurityDefinition,
    ]
    const auth = {
      securityDefinitions,
      security: [[BASIC_AUTH_ID]],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual({
      securityDefinitions: {
        BasicAuth: {
          type: 'basic',
        },
      },
      security: [{ BasicAuth: [] }],
    });
  });

  it('should return api key auth config', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
      ],
      security: [[API_KEY_AUTH_ID_1]],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual({
      security: [{ APIKeyHeader: [] }],
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          name: API_KEY_HEADER_1,
          in: 'header',
        },
      },
    });
  });

  it('should return empty object if no auth config', () => {
    const auth = {};
    const result = getAuthentication(auth);
    expect(result).toEqual({});
  });

  it('should allow multiple security definitions', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
        apiKeySecurityDefinition2,
      ],
      security: [[API_KEY_AUTH_ID_1]],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual(expect.objectContaining({
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          name: API_KEY_HEADER_1,
          in: 'header',
        },
        APIKeyHeader2: {
          type: 'apiKey',
          name: API_KEY_HEADER_2,
          in: 'header',
        },
      },
    }));
  });

  it('should allow having no default security', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
      ],
      security: [],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual(expect.objectContaining({
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          name: API_KEY_HEADER_1,
          in: 'header',
        },
      },
      security: [],
    }));
  });

  it('should allow OR type default security', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
        apiKeySecurityDefinition2,
      ],
      security: [[API_KEY_AUTH_ID_1], [API_KEY_AUTH_ID_2]],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual(expect.objectContaining({
      security: [{ APIKeyHeader: [] }, { APIKeyHeader2: [] }],
    }));
  });

  it('should allow AND and OR type default security', () => {
    const auth = {
      securityDefinitions: [
        basicSecurityDefinition,
        apiKeySecurityDefinition1,
        apiKeySecurityDefinition2,
      ],
      security: [[API_KEY_AUTH_ID_1, API_KEY_AUTH_ID_2], [BASIC_AUTH_ID]],
    };
    const result = getAuthentication(auth);
    expect(result).toEqual(expect.objectContaining({
      security: [{ APIKeyHeader: [], APIKeyHeader2: [] }, { BasicAuth: [] }],
    }));
  });

  it('should not allow non matching security definitions and security', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
      ],
      security: [[API_KEY_AUTH_ID_1, API_KEY_AUTH_ID_2]],
    };

    try {
      getAuthentication(auth);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Invalid security keys: APIKeyHeader2');
    }
  });

  it('should not allow duplicate security definition ids', () => {
    const auth = {
      securityDefinitions: [
        apiKeySecurityDefinition1,
        apiKeySecurityDefinition1,
      ],
    };

    try {
      getAuthentication(auth);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Security definitions must have unique ids');
    }
  });
});
