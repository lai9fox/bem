import { createBem } from '../src';

describe('validation', () => {
  test.each(['', 'with space', '\n'])('rejects invalid element names: %p', (name) => {
    expect(() => createBem().block('button').element(name)).toThrow(TypeError);
  });

  test('rejects invalid names at every remaining public boundary', () => {
    const bem = createBem();
    const button = bem.block('button');

    expect(() => bem.block('not valid')).toThrow(TypeError);
    expect(() => button.modifier('not valid')).toThrow(TypeError);
    expect(() => button.elementModifier('icon', 'not valid')).toThrow(TypeError);
  });

  test('rejects null configuration values instead of applying defaults', () => {
    expect(() => createBem({ elementSeparator: null })).toThrow(TypeError);
    expect(() => createBem({ modifierSeparator: null })).toThrow(TypeError);
    expect(() => createBem({ namespace: null })).toThrow(TypeError);
  });

  test('rejects whitespace and empty separator configuration', () => {
    expect(() => createBem({ namespace: 'acme ui-' })).toThrow(TypeError);
    expect(() => createBem({ elementSeparator: '' })).toThrow(TypeError);
    expect(() => createBem({ modifierSeparator: ' ' })).toThrow(TypeError);
  });

  test('rejects a non-object factory configuration and non-array static batches', () => {
    const button = createBem().block('button');

    expect(() => createBem(null)).toThrow(TypeError);
    expect(() => button.elements('icon')).toThrow(TypeError);
    expect(() => button.modifiers('disabled')).toThrow(TypeError);
    expect(() => button.elementModifiers('icon', 'active')).toThrow(TypeError);
  });

  test('rejects invalid descriptor containers', () => {
    const button = createBem().block('button');

    expect(() => button.classes({ modifiers: [] })).toThrow(TypeError);
    expect(() => button.classes({ elementModifiers: { icon: [] } })).toThrow(TypeError);
  });

  test('keeps separator collisions literal and one-way', () => {
    const bem = createBem();

    expect(bem.block('menu--compact').block()).toBe('menu--compact');
    expect(bem.block('menu').modifier('compact')).toBe('menu--compact');
  });

  test('skips falsy conditions before validating their names', () => {
    const button = createBem().block('button');

    expect(button.classes({
      elements: { 'not valid': false },
      modifiers: { 'also not valid': 0 },
      elementModifiers: { 'still not valid': { 'not a modifier': null } },
    })).toBe('');
  });
});
