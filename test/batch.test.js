import { createBem } from '../src';

describe('batch API', () => {
  test('joins static element names and removes later duplicates', () => {
    const button = createBem().block('button');

    expect(button.elements(['icon', 'icon', 'label']))
      .toBe('button__icon button__label');
  });

  test('joins static element modifier names and removes later duplicates', () => {
    const button = createBem().block('button');

    expect(button.elementModifiers('icon', ['active', 'active']))
      .toBe('button__icon--active');
  });

  test('joins static block modifier names and removes later duplicates', () => {
    const button = createBem().block('button');

    expect(button.modifiers(['disabled', 'disabled', 'loading']))
      .toBe('button--disabled button--loading');
  });

  test('returns an empty string for empty homogeneous batches', () => {
    const button = createBem().block('button');

    expect(button.elements([])).toBe('');
    expect(button.modifiers([])).toBe('');
    expect(button.elementModifiers('icon', [])).toBe('');
  });

  test('assembles truthy mixed categories in BEM order', () => {
    const button = createBem().block('button');

    expect(button.classes({
      block: 1,
      elements: { icon: true, label: 0 },
      modifiers: { disabled: 'yes', loading: null },
      elementModifiers: { icon: { active: {}, hidden: false } },
    })).toBe('button button__icon button--disabled button__icon--active');
  });

  test('does not infer block or element parent classes', () => {
    const button = createBem().block('button');

    expect(button.classes({
      modifiers: { disabled: true },
      elementModifiers: { icon: { active: true } },
    })).toBe('button--disabled button__icon--active');
  });

  test('stably de-duplicates mixed output and returns empty output when nothing is selected', () => {
    const button = createBem().block('button');

    expect(button.classes({
      elements: { 'icon--active': true },
      elementModifiers: { icon: { active: true } },
    })).toBe('button__icon--active');
    expect(button.classes({})).toBe('');
  });
});
