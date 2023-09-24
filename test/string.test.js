import defineBem from "../src";

const createBem = defineBem('bem');
const bem = createBem('nav');

describe('String Test: ', () => {

  test('empty description', () => {
    expect(bem('')).toBe('bem-nav');
  });

  test('empty description', () => {
    expect(bem('', 'hover')).toBe('bem-nav--hover');
  });

  test('ele description', () => {
    expect(bem('input')).toBe('bem-nav__input');
  });

  test('mod description', () => {
    expect(bem(':hover')).toBe('bem-nav--hover');
  });

  test('ele description with inline mod', () => {
    expect(bem('input:hover')).toBe('bem-nav__input--hover');
  });

  test('ele description with append mod', () => {
    expect(bem('input', 'focus')).toBe('bem-nav__input--focus');
  });

  test('mod description with append mod', () => {
    expect(bem(':hover', 'focus')).toBe('bem-nav--hover');
  });

  test('full description with append mod', () => {
    expect(bem('input:hover', 'focus')).toBe('bem-nav__input--hover');
  });

});
