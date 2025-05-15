import initialBem from '../src';

const createBem = initialBem();
const bem = createBem('nav');

describe('Array Test: ', () => {

  test('pure ele', () => {
    expect(bem([
      'button',
      'input',
    ])).toEqual([
      'nav__button',
      'nav__input',
    ]);
  });

  test('ele with append mod', () => {
    expect(bem([
      'button',
      'input',
    ], 'append')).toEqual([
      'nav__button--append',
      'nav__input--append',
    ]);
  });

  test('pure mod', () => {
    expect(bem([
      ':hover',
      ':click',
    ])).toEqual([
      'nav--hover',
      'nav--click',
    ]);
  });

  test('mod with append mod', () => {
    expect(bem([
      ':hover',
      ':click',
    ], 'append')).toEqual([
      'nav--hover',
      'nav--click',
    ]);
  });

  test('ele with inline mod', () => {
    expect(bem([
      'button:hover',
      'input:click',
    ])).toEqual([
      'nav__button--hover',
      'nav__input--click',
    ]);
  });

  test('full description with append mod', () => {
    expect(bem([
      'button:hover',
      'input:click',
    ], 'append')).toEqual([
      'nav__button--hover',
      'nav__input--click',
    ]);
  });

  test('with object', () => {
    expect(bem([
      'button',
      'input',
      {
        video: -99,
        audio: false,
      },
    ])).toEqual([
      'nav__button',
      'nav__input',
      'nav__video',
    ]);
  });

  test('with inline mod object', () => {
    expect(bem([
      'button',
      'input',
      {
        video: -99,
        'audio:played': false,
      },
    ])).toEqual([
      'nav__button',
      'nav__input',
      'nav__video',
    ]);
  });

  test('with object and append mod', () => {
    expect(bem([
      'button:focus',
      'input',
      {
        video: -99,
        'audio:played': false,
      },
    ], 'append')).toEqual([
      'nav__button--focus',
      'nav__input--append',
      'nav__video--append',
    ]);
  });

  test('exist falsy value', () => {
    expect(bem([
      0.5 > 1 ? 'button' : 'radio',
      'input',
      '',
      {
        video: -99,
      },
      {
        // empty
      },
    ], 'append')).toEqual([
      'nav__radio--append',
      'nav__input--append',
      'nav__video--append',
    ]);
  });

  test('empty array', () => {
    expect(bem([])).toEqual([]);
  });

});
