import { cleanPath, getPath } from '../src/lib/utils';

describe('Utility tests', () => {
  describe('Clean path tests', () => {
    it('should convert the path to a valid swagger path', () => {
      expect(cleanPath('/users/:id')).toBe('/users/{id}');
    });
    it('should ignore the path and return the same path', () => {
      expect(cleanPath('/users')).toBe('/users');
    });
  });
});

describe('getPath', () => {
  const pathWithoutPrefix = '/test';
  const prefix = '/api';
  const fullPath = `${prefix}${pathWithoutPrefix}`;
  const REMOVE_PREFIX = true;
  const KEEP_PREFIX = false;
  it('should return the path without the prefix when option is set', () => {
    expect(getPath(fullPath, prefix, REMOVE_PREFIX)).toBe(pathWithoutPrefix);
  });

  it('should return the path with the prefix when option is set', () => {
    expect(getPath(fullPath, prefix, KEEP_PREFIX)).toBe(fullPath);
  });
});
