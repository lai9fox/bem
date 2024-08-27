import createBem from '../src';

const bem = createBem('nav');

describe('Setup Test: ', () => {
  test('change concat', () => {
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav__logo');
    expect(bem('', 'hover')).toBe('nav--hover');
    createBem.setConcat({ elementConcat: '_' });
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav_logo');
    expect(bem('', 'hover')).toBe('nav--hover');
    createBem.setConcat({ modifyConcat: '-' });
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav_logo');
    expect(bem('', 'hover')).toBe('nav-hover');
  });
});
