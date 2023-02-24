import createBem from "../src";

const bem = createBem('arr-test');

describe('Array Test: ', () => {

  test('pure ele', () => {
    expect(bem([
      'button',
      'input'
    ])).toEqual([
      'arr-test__button',
      'arr-test__input',
    ]);
  });

  test('ele with append mod', () => {
    expect(bem([
      'button',
      'input'
    ], 'append')).toEqual([
      'arr-test__button--append',
      'arr-test__input--append',
    ]);
  });

  test('pure mod', () => {
    expect(bem([
      ':hover',
      ':click'
    ])).toEqual([
      'arr-test--hover',
      'arr-test--click',
    ]);
  });

  test('mod with append mod', () => {
    expect(bem([
      ':hover',
      ':click'
    ], 'append')).toEqual([
      'arr-test--hover',
      'arr-test--click',
    ]);
  });

  test('ele with inline mod', () => {
    expect(bem([
      'button:hover',
      'input:click'
    ])).toEqual([
      'arr-test__button--hover',
      'arr-test__input--click',
    ]);
  });

  test('full description with append mod', () => {
    expect(bem([
      'button:hover',
      'input:click'
    ], 'append')).toEqual([
      'arr-test__button--hover',
      'arr-test__input--click',
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
      'arr-test__button',
      'arr-test__input',
      {
        'arr-test__video': -99,
        'arr-test__audio': false,
      }
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
      'arr-test__button',
      'arr-test__input',
      {
        'arr-test__video': -99,
        'arr-test__audio--played': false,
      }
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
      'arr-test__button--focus',
      'arr-test__input--append',
      {
        'arr-test__video--append': -99,
        'arr-test__audio--played': false,
      }
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
      'arr-test__radio--append',
      'arr-test__input--append',
      {
        'arr-test__video--append': -99,
      }
    ])
  });

  test('empty array', () => {
    expect(bem([])).toEqual([]);
  });

});
