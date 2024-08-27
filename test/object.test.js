import createBem from "../src";

const bem = createBem('nav');

describe('Object Test: ', () => {

  test('pure ele', () => {
    expect(bem({
      button: true,
      input: false,
    })).toEqual(['nav__button']);
  });

  test('pure mod', () => {
    expect(bem({
      ':hover': true,
      'focus': false,
    })).toEqual(['nav--hover']);
  });

  test('ele with inline mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    })).toEqual(['nav__button--hover']);
  });

  test('pure ele with append mod', () => {
    expect(bem({
      button: true,
      input: true,
    }, 'click')).toEqual(['nav__button--click', 'nav__input--click']);
  });

  test('pure mod with append mod', () => {
    expect(bem({
      ':hover': true,
      ':focus': false,
    }, 'click')).toEqual(['nav--hover']);
  });

  test('full description with append mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    }, 'click')).toEqual(['nav__button--hover']);
  });

  test('random mix', () => {
    expect(bem({
      input: -99,
      button: 'button',
      ':mouse-in': true,
      ':mouse-out': 0.5 > 1 ? 'bigger' : 'less',
      'video:played': false
    }, 'append')).toEqual([
      'nav__input--append',
      'nav__button--append',
      'nav--mouse-in',
      'nav--mouse-out',
    ]);
  });

  test('empty object', () => {
    expect(bem({})).toEqual([]);
  });

});
