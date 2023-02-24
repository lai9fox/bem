import createBem from "../src";

describe('Fallback Test: ', () => {

  test('should return a function that return an empty string', () => {
    expect(createBem()).toBeInstanceOf(Function);
  });
  
  test('should return an empty string', () => {
    expect(createBem()()).toBe('');
  });

  test('should return a function that return an empty string', () => {
    expect(createBem(-99)).toBeInstanceOf(Function);
  });

  test('should return an empty string', () => {
    expect(createBem(-99)()).toBe('');
  });

  test('should return namespace', () => {
    expect(createBem('fall-back')(10)).toBe('fall-back');
  });

  test('should return namespace', () => {
    expect(createBem('fall-back')(new Set())).toBe('fall-back');
  });

});
