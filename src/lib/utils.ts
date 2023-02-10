/**
 * Convert express path to swagger path.
 * @param {string} path - Express path.
 * @returns {string} Swagger path.
 */
export const cleanPath = (path: string): string =>
  path.replace(/:+/g, '{').replace(/({+\w+)()/g, '$1}$2');

/**
 * Creates a path ready to user in swagger documentation.
 * @param {string} path - Express path with prefix already included.
 * @param {string} prefix - Prefix to be removed from the path.
 * @param {boolean} shouldOmitPrefix - Whether the prefix should be removed from the path.
 * @returns {string} Path ready to be used in swagger documentation.
 */
export const getPath = (path: string, prefix: string, shouldOmitPrefix: boolean): string => {
  const cleanedPath = cleanPath(path);

  if (shouldOmitPrefix) {
    const prefixRegex = new RegExp(`^${prefix}`);
    const newPath = cleanedPath.replace(prefixRegex, '');

    if (newPath === '') {
      return '/';
    }

    return newPath;
  }

  return cleanedPath;
};
