import defineBem from "../src";

const createBemEmpty = defineBem();
const bemEmpty = createBemEmpty('nav');

const createBemPrefix = defineBem('bem');
const bemPrefix = createBemPrefix('nav');

const createBemConfig = defineBem(undefined, {elementConcat: '_', modifierConcat: '-'});
const bemConfig = createBemConfig('nav');

const createBemPAC = defineBem('bem', {elementConcat: '_', modifierConcat: '-'});
const bemPAC = createBemPAC('nav');

describe('Config Test: ', () => {

  test('empty', () => {
    expect(bemEmpty()).toBe('nav');
    expect(bemEmpty('input')).toBe('nav__input');
    expect(bemEmpty(':hover')).toBe('nav--hover');
    expect(bemEmpty(undefined, 'focus')).toBe('nav--focus');
    expect(bemEmpty(':hover', 'focus')).toBe('nav--hover');
    expect(bemEmpty('input', 'focus')).toBe('nav__input--focus');
    expect(bemEmpty('input:hover', 'focus')).toBe('nav__input--hover');
  });

  test('prefix', () => {
    expect(bemPrefix()).toBe('bem-nav');
    expect(bemPrefix('input')).toBe('bem-nav__input');
    expect(bemPrefix(':hover')).toBe('bem-nav--hover');
    expect(bemPrefix(undefined, 'focus')).toBe('bem-nav--focus');
    expect(bemPrefix(':hover', 'focus')).toBe('bem-nav--hover');
    expect(bemPrefix('input', 'focus')).toBe('bem-nav__input--focus');
    expect(bemPrefix('input:hover', 'focus')).toBe('bem-nav__input--hover');
  });

  test('config', () => {
    expect(bemConfig()).toBe('nav');
    expect(bemConfig('input')).toBe('nav_input');
    expect(bemConfig(':hover')).toBe('nav-hover');
    expect(bemConfig(undefined, 'focus')).toBe('nav-focus');
    expect(bemConfig(':hover', 'focus')).toBe('nav-hover');
    expect(bemConfig('input', 'focus')).toBe('nav_input-focus');
    expect(bemConfig('input:hover', 'focus')).toBe('nav_input-hover');
  });

  test('prefix and config', () => {
    expect(bemPAC()).toBe('bem-nav');
    expect(bemPAC('input')).toBe('bem-nav_input');
    expect(bemPAC(':hover')).toBe('bem-nav-hover');
    expect(bemPAC(undefined, 'focus')).toBe('bem-nav-focus');
    expect(bemPAC(':hover', 'focus')).toBe('bem-nav-hover');
    expect(bemPAC('input', 'focus')).toBe('bem-nav_input-focus');
    expect(bemPAC('input:hover', 'focus')).toBe('bem-nav_input-hover');
  });
});
