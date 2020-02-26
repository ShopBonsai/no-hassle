import { cleanPath } from '../src/lib/utils';

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
