import defineBem from "../src";

const createBem = defineBem('bem');
const bem = createBem('nav');

describe('Object Test: ', () => {

  test('pure ele', () => {
    expect(bem({
      button: true,
      input: false,
    })).toEqual(['bem-nav__button']);
  });

  test('pure mod', () => {
    expect(bem({
      ':hover': true,
      'focus': false,
    })).toEqual(['bem-nav--hover']);
  });

  test('ele with inline mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    })).toEqual(['bem-nav__button--hover']);
  });

  test('pure ele with append mod', () => {
    expect(bem({
      button: true,
      input: true,
    }, 'click')).toEqual(['bem-nav__button--click', 'bem-nav__input--click']);
  });

  test('pure mod with append mod', () => {
    expect(bem({
      ':hover': true,
      ':focus': false,
    }, 'click')).toEqual(['bem-nav--hover']);
  });

  test('full description with append mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    }, 'click')).toEqual(['bem-nav__button--hover']);
  });

  test('random mix', () => {
    expect(bem({
      input: -99,
      button: 'button',
      ':mouse-in': true,
      ':mouse-out': 0.5 > 1 ? 'bigger' : 'less',
      'video:played': false
    }, 'append')).toEqual([
      'bem-nav__input--append',
      'bem-nav__button--append',
      'bem-nav--mouse-in',
      'bem-nav--mouse-out',
    ]);
  });

  test('empty object', () => {
    expect(bem({})).toEqual([]);
  });

});
