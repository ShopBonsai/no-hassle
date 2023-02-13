/**
 * Convert express path to swagger path.
 * @param {string} path - Express path.
 * @returns {string} Swagger path.
 */
export const cleanPath = (path: string): string =>
  path.replace(/:+/g, '{').replace(/({+\w+)()/g, '$1}$2');

/**
 * Creates a function that removes a prefix from a path.
 * @param {string} prefix - Prefix to be removed from the path.
 * @returns {Function} A function that takes a string and removes the prefix from it.
 */
export const makeRemovePrefix =
  (prefix: string) =>
  (path: string): string => {
    const prefixRegex = new RegExp(`^${prefix}`);
    const newPath = path.replace(prefixRegex, '');

    if (newPath === '') {
      return '/';
    }

    return newPath;
  };

/**
 * Creates a path ready to user in swagger documentation.
 * @param {string} path - Express path with prefix already included.
 * @param {Function} transformPath - Function to transform the path before it is used in swagger documentation.
 * @returns {string} Path ready to be used in swagger documentation.
 */
export const getTransformedPath = (
  path: string,
  transformPath: ((_: string) => string) = path => path,
): string => {
  const cleanedPath = cleanPath(path);

  return transformPath(cleanedPath);
};

/**
 * Use to confirm that types have been exhaustively checked in case statements.
 */
export const assertNever = (x: never): never => {
  throw new Error(`Unexpected object: ${x}`);
};
