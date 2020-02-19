/**
 * Convert express path to swagger path.
 * @param {string} path - Express path.
 * @returns {string} Swagger path.
 */
export const cleanPath = (path: string): string =>
  path.replace(/:+/g, '{').replace(/({+\w+)()/g, '$1}$2');
