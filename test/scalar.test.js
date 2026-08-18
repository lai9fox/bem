import { createBem } from '../src';

describe('scalar API', () => {
  test('creates literal scalar BEM class names', () => {
    const button = createBem({ namespace: 'acme-' }).block('button');

    expect(button.block()).toBe('acme-button');
    expect(button.element('icon')).toBe('acme-button__icon');
    expect(button.modifier('disabled')).toBe('acme-button--disabled');
    expect(button.elementModifier('icon', 'active')).toBe('acme-button__icon--active');
  });

  test('keeps configuration and block instances independent', () => {
    const bem = createBem({ elementSeparator: '_' });

    expect(bem.block('button').element('icon')).toBe('button_icon');
    expect(bem.block('card').element('title')).toBe('card_title');
  });

  test('keeps separate factories isolated', () => {
    const namespaced = createBem({ namespace: 'acme-' }).block('button');
    const plain = createBem().block('button');

    expect(namespaced.block()).toBe('acme-button');
    expect(plain.block()).toBe('button');
  });

  test('applies all custom separators literally', () => {
    const button = createBem({
      namespace: 'acme-',
      elementSeparator: '_',
      modifierSeparator: '-',
    }).block('button');

    expect(button.elementModifier('icon', 'active')).toBe('acme-button_icon-active');
  });
});
