import defineBem from "../src";

const createBem = defineBem('bem');
const bem = createBem('nav');

describe('Array Test: ', () => {

  test('pure ele', () => {
    expect(bem([
      'button',
      'input'
    ])).toEqual([
      'bem-nav__button',
      'bem-nav__input',
    ]);
  });

  test('ele with append mod', () => {
    expect(bem([
      'button',
      'input'
    ], 'append')).toEqual([
      'bem-nav__button--append',
      'bem-nav__input--append',
    ]);
  });

  test('pure mod', () => {
    expect(bem([
      ':hover',
      ':click'
    ])).toEqual([
      'bem-nav--hover',
      'bem-nav--click',
    ]);
  });

  test('mod with append mod', () => {
    expect(bem([
      ':hover',
      ':click'
    ], 'append')).toEqual([
      'bem-nav--hover',
      'bem-nav--click',
    ]);
  });

  test('ele with inline mod', () => {
    expect(bem([
      'button:hover',
      'input:click'
    ])).toEqual([
      'bem-nav__button--hover',
      'bem-nav__input--click',
    ]);
  });

  test('full description with append mod', () => {
    expect(bem([
      'button:hover',
      'input:click'
    ], 'append')).toEqual([
      'bem-nav__button--hover',
      'bem-nav__input--click',
    ]);
  });

  test('with object', () => {
    expect(bem([
      'button',
      'input',
      {
        video: -99,
        audio: false,
      }
    ])).toEqual([
      'bem-nav__button',
      'bem-nav__input',
      'bem-nav__video',
    ])
  });

  test('with inline mod object', () => {
    expect(bem([
      'button',
      'input',
      {
        video: -99,
        'audio:played': false,
      }
    ])).toEqual([
      'bem-nav__button',
      'bem-nav__input',
      'bem-nav__video',
    ])
  });

  test('with object and append mod', () => {
    expect(bem([
      'button:focus',
      'input',
      {
        video: -99,
        'audio:played': false,
      }
    ], 'append')).toEqual([
      'bem-nav__button--focus',
      'bem-nav__input--append',
      'bem-nav__video--append',
    ])
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
      }
    ], 'append')).toEqual([
      'bem-nav__radio--append',
      'bem-nav__input--append',
      'bem-nav__video--append',
    ])
  });

  test('empty array', () => {
    expect(bem([])).toEqual([]);
  });

});
