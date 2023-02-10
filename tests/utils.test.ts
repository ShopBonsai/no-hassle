import { cleanPath, makeRemovePrefix, getTransformedPath } from '../src/lib/utils';

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

describe('getTransformedPath', () => {
  const prefix = '/api';
  const pathWithoutPrefix = '/test';
  const fullPathWithParam = `${prefix}${pathWithoutPrefix}/:id`;

  it('should return the path after cleaning it by default', () => {
    expect(getTransformedPath(fullPathWithParam)).toBe('/api/test/{id}');
  });

  it.each([
    {
      transformFunction: makeRemovePrefix(prefix),
      expectedPath: '/test/{id}',
    },
    {
      transformFunction: makeRemovePrefix(`${prefix}${pathWithoutPrefix}`),
      expectedPath: '/{id}',
    },
  ])('should use the predefined makeRemovePrefix to remove prefixes from a cleaned path', ({ transformFunction, expectedPath }) => {
    expect(getTransformedPath(fullPathWithParam, transformFunction)).toBe(expectedPath);
  });

  it('should take a custom function to transform the path', () => {
    const customTransform = (path: string) => path.replace(/\/api/, '');
    expect(getTransformedPath(fullPathWithParam, customTransform)).toBe('/test/{id}');
  });
});
