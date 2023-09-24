import defineBem from "../src";

const createBem = defineBem('bem');

describe('Namespace Test: ',() => {

  test('namespace test', () => {
    expect(createBem).toBeInstanceOf(Function);
    try {
      createBem();
    } catch (e) {
      expect(e.message).toMatch("A 'namespace' of type string is required");
    }
    expect(createBem('input')).not.toThrow("A 'namespace' of type string is required");
    expect(createBem('input')).toBeInstanceOf(Function);
    expect(createBem('input')()).toBe('bem-input');
  })
});
