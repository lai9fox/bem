import createBem from "../src";

const bem = createBem('obj-test');

describe('Object Test: ', () => {

  test('pure ele', () => {
    expect(bem({
      button: true,
      input: false,
    })).toEqual({
      'obj-test__button': true,
      'obj-test__input': false,
    });
  });

  test('pure mod', () => {
    expect(bem({
      ':hover': true,
      'focus': false,
    })).toEqual({
      'obj-test--hover': true,
      'obj-test__focus': false,
    });
  });

  test('ele with inline mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    })).toEqual({
      'obj-test__button--hover': true,
      'obj-test__input--focus': false,
    });
  });

  test('pure ele with append mod', () => {
    expect(bem({
      button: true,
      input: false,
    }, 'click')).toEqual({
      'obj-test__button--click': true,
      'obj-test__input--click': false,
    });
  });

  test('pure mod with append mod', () => {
    expect(bem({
      ':hover': true,
      ':focus': false,
    }, 'click')).toEqual({
      'obj-test--hover': true,
      'obj-test--focus': false,
    });
  });

  test('full description with append mod', () => {
    expect(bem({
      'button:hover': true,
      'input:focus': false,
    }, 'click')).toEqual({
      'obj-test__button--hover': true,
      'obj-test__input--focus': false,
    });
  });

  test('random mix', () => {
    expect(bem({
      input: -99,
      button: 'button',
      ':mouse-in': true,
      ':mouse-out': 0.5 > 1 ? 'bigger' : 'less',
      'video:played': false
    }, 'append')).toEqual({
      'obj-test__input--append': -99,
      'obj-test__button--append': 'button',
      'obj-test--mouse-in': true,
      'obj-test--mouse-out': 'less',
      'obj-test__video--played': false
    });
  });

  test('empty object', () => {
    expect(bem({})).toEqual({});
  });
  
});
