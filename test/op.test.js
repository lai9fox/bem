import createBem from "../src";

describe('Options Test: ', () => {
  
  test('element concat change', () => {

    expect(createBem('op-test', { elementConcat: '++' })('change')).toBe('op-test++change');
    
    expect(createBem('op-test', { modifierConcat: '**' })(':change')).toBe('op-test**change');
    
    expect(createBem('op-test', { elementConcat: '++', modifierConcat: '**' })('c1:c2')).toBe('op-test++c1**c2');
  
  });
});
