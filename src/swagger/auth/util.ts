
import { assertNever } from '../../lib/utils';
import { AuthenticationTypes, Security, SecurityDefinition } from '../../interfaces';
import { IOutputSecurityDefinitions } from './interfaces';

/**
 * Defines a basic security definition for the swagger spec.
 * @param {string} id - Identifier for the security definition.
 */
export const createBasicSecurityDefinition = (id: string) => ({
  [id]: {
    type: AuthenticationTypes.BASIC,
  },
});

/**
 * Defines an apiKey security definition for the swagger spec.
 * @param {string} id - Identifier for the security definition.
 * @param {string} header - Header users will need to provide to authenticate.
 */
export const createApiKeySecurityDefinition = (id: string, header: string) => ({
  [id]: {
    type: AuthenticationTypes.API_KEY,
    name: header,
    in: 'header',
  },
});

/**
 * Ensures that all security keys are defined in the security definitions.
 * @param {Security} security - Simplified security object.
 * @param {string[]} validSecurityIds - List of valid security ids defined in the security definitions.
 * @throws {Error} - If any security keys are not valid.
 */
export const validateSecurity = (security: Security, validSecurityIds: string[]) => {
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
export const validateSecurityDefinitions = (securityDefinitions: SecurityDefinition[]) => {
  const securityDefinitionIds = securityDefinitions.map(({ id }) => id);
  const uniqueSecurityDefinitionIds = new Set(securityDefinitionIds);
  if (securityDefinitionIds.length !== uniqueSecurityDefinitionIds.size) {
    throw new Error(`Security definitions must have unique ids: ${securityDefinitionIds.join(', ')}`);
  }
};

/**
 * Generates a security definition object that can be used in the swagger spec.
 * @param {SecurityDefinition[]} securityDefinitions
 * @returns {IOutputSecurityDefinitions} - Ex. { BasicAuth: { type: 'basic' }, ApiAuth: { type: 'apiKey', name: 'API-Key', in: 'header' } }
 */
export const getSecurityDefinitions = (securityDefinitions: SecurityDefinition[]): IOutputSecurityDefinitions => {
  validateSecurityDefinitions(securityDefinitions);

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
