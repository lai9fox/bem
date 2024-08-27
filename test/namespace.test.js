import createBem from "../src";

describe('Namespace Test: ',() => {

  test('empty namespace', () => {
    const errorMsg = "A 'namespace' of type string is required";
    try {
      createBem();
    } catch (e) {
      expect(e.message).toMatch(errorMsg);
    }
    expect(createBem('nav')).not.toThrow(errorMsg);
  });

  test('legal namespace', () => {
    expect(createBem).toBeInstanceOf(Function);
    expect(createBem('nav')).toBeInstanceOf(Function);
    expect(createBem('nav')()).toBe('nav');
  });
});
