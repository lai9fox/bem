import createBem from '../src/index';

describe('NameSpace Test: ', () => {
  
  test('should return a bem function', () => {
    expect(createBem('ns-test')).toBeInstanceOf(Function);
  });

  test("should return 'ns-test'", () => {
    expect(createBem('ns-test')()).toBe('ns-test');
  });

});
