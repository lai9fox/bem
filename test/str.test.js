import createBem from "../src";

const bem = createBem('str-test');

describe('String Test: ', () => {

  test('ele description', () => {
    expect(bem('button')).toBe('str-test__button');
  });

  test('mod description', () => {
    expect(bem(':hover')).toBe('str-test--hover');
  });

  test('ele description with inline mod', () => {
    expect(bem('button:hover')).toBe('str-test__button--hover');
  });

  test('ele description with append mod', () => {
    expect(bem('button', 'focus')).toBe('str-test__button--focus');
  });

  test('mod description with append mod', () => {
    expect(bem(':hover', 'focus')).toBe('str-test--hover');
  });

  test('full description with append mod', () => {
    expect(bem('button:hover', 'focus')).toBe('str-test__button--hover');
  });
  
});
