import initialBem from '../src';

const createBem = initialBem();
const bem = createBem('nav');

describe('String Test: ', () => {

  test('empty description', () => {
    expect(bem()).toBe('nav');
  });

  test('empty description', () => {
    expect(bem('', 'hover')).toBe('nav--hover');
  });

  test('ele description', () => {
    expect(bem('input')).toBe('nav__input');
  });

  test('mod description', () => {
    expect(bem(':hover')).toBe('nav--hover');
  });

  test('ele description with inline mod', () => {
    expect(bem('input:hover')).toBe('nav__input--hover');
  });

  test('ele description with append mod', () => {
    expect(bem('input', 'focus')).toBe('nav__input--focus');
  });

  test('mod description with append mod', () => {
    expect(bem(':hover', 'focus')).toBe('nav--hover');
  });

  test('full description with append mod', () => {
    expect(bem('input:hover', 'focus')).toBe('nav__input--hover');
  });
});
