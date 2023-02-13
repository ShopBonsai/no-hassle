
import { assertNever } from '../../lib/utils';
import { Authentication, AuthenticationTypes, Security, SecurityDefinition } from '../../interfaces';
import { IOutputAuthentication, OutputSecurity } from './interfaces';

/**
 * Defines a basic security definition for the swagger spec.
 * @param {string} id - Identifier for the security definition.
 */
const createBasicSecurityDefinition = (id: string) => ({
  [id]: {
    type: AuthenticationTypes.BASIC,
  },
});

/**
 * Defines an apiKey security definition for the swagger spec.
 * @param {string} id - Identifier for the security definition.
 * @param {string} header - Header users will need to provide to authenticate.
 */
const createApiKeySecurityDefinition = (id: string, header: string) => ({
  [id]: {
    type: AuthenticationTypes.API_KEY,
    name: header,
    in: 'header',
  },
});

/**
 * Generates a security definition object that can be used in the swagger spec.
 * @param {SecurityDefinition[]} securityDefinitions
 */
const getSecurityDefinitions = (securityDefinitions: SecurityDefinition[]) => {
  return securityDefinitions.reduce((acc, def) => {
    switch (def.type) {
      case AuthenticationTypes.BASIC:
        return {
          ...acc,
          ...createBasicSecurityDefinition(def.id),
        };
      case AuthenticationTypes.API_KEY:
        return {
          ...acc,
          ...createApiKeySecurityDefinition(def.id, def.header),
        };
      default:
        return assertNever(def);
    }
  }, {});
};

/**
 * Generates the security object that can be used in the swagger spec.
 * Can be used for both default security and operation level security.
 * Does not support scoping for OAuth2 security definitions.
 * @param {Security} security
 */
const getSecurity = (security: Security): OutputSecurity => {
  return security.map((sec) => {
    return sec.reduce((acc, def) => {
      return {
        ...acc,
        [def]: [],
      };
    }, {});
  });
};

/**
 * Ensures that all security keys are defined in the security definitions.
 * @param {Security} security - Simplified security object.
 * @param {string[]} validSecurityIds - List of valid security ids defined in the security definitions.
 * @throws {Error} - If any security keys are not valid.
 */
const validateSecurity = (security: Security, validSecurityIds: string[]) => {
  const securityKeys = security.flatMap(sec => sec);
  const invalidSecurityKeys = securityKeys.filter(key => !validSecurityIds.includes(key));
  if (invalidSecurityKeys.length > 0) {
    throw new Error(`Invalid security keys: ${invalidSecurityKeys.join(', ')}`);
  }
};

/**
 * Ensure that all security definitions have unique ids.
 * @param {SecurityDefinition[]} securityDefinitions - List of simplified security definitions.
 * @throws {Error} - If any security definitions have duplicate ids.
 */
const validateSecurityDefinitions = (securityDefinitions: SecurityDefinition[]) => {
  const securityDefinitionIds = securityDefinitions.map(({ id }) => id);
  const uniqueSecurityDefinitionIds = new Set(securityDefinitionIds);
  if (securityDefinitionIds.length !== uniqueSecurityDefinitionIds.size) {
    throw new Error(`Security definitions must have unique ids: ${securityDefinitionIds.join(', ')}`);
  }
};

/**
 * Converts simplified authentication object to the format expected by the swagger spec
 * for the securityDefinitions and security properties.
 * @param {Authentication} auth - Simplified authentication object, if not provided, will return an empty object.
 * @returns {IOutputAuthentication} - Authentication object that can be used in the swagger spec.
 */
export const getAuthentication = (auth?: Authentication): IOutputAuthentication => {
  const { securityDefinitions, security = [] } = auth ?? {};
  if (!securityDefinitions) {
    return {};
  }

  validateSecurityDefinitions(securityDefinitions);
  validateSecurity(security, securityDefinitions.map(({ id }) => id));

  return {
    securityDefinitions: getSecurityDefinitions(securityDefinitions),
    security: getSecurity(security),
  };
};
