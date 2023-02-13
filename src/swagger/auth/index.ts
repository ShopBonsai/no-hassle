
import { Authentication, Security } from '../../interfaces';
import { IOutputAuthentication, OutputSecurity } from './interfaces';
import { getSecurityDefinitions, validateSecurity } from './util';

/**
 * Generates the security object that can be used in the swagger spec.
 * Can be used for both default security and operation level security.
 * Does not support scoping for OAuth2 security definitions.
 * @param {Security} security - Ex. [['BasicAuth']]
 * @returns {OutputSecurity} - Ex. [{ BasicAuth: [] }]
 */
export const getSecurity = (security: Security): OutputSecurity => {
  return security.map((sec) => {
    return sec.reduce((acc, securityDefinitionId) => {
      return {
        ...acc,
        [securityDefinitionId]: [],
      };
    }, {});
  });
};

/**
 * Converts simplified authentication object to the format expected by the swagger spec
 * for the securityDefinitions and security properties.
 * @param {Authentication} auth - Simplified authentication object, if not provided, will return an empty object.
 * @returns {IOutputAuthentication} - Authentication object that can be used in the swagger spec.
 */
export const getAuthentication = (auth?: Authentication): IOutputAuthentication => {
  const { securityDefinitions, security = [] } = auth || {};
  if (!securityDefinitions) {
    return {};
  }

  validateSecurity(security, securityDefinitions.map(({ id }) => id));

  return {
    securityDefinitions: getSecurityDefinitions(securityDefinitions),
    security: getSecurity(security),
  };
};
