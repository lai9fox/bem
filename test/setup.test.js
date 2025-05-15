import initialBem from '../src';

describe('Setup Test: ', () => {

  test('basic', () => {
    const createBem = initialBem();
    const bem = createBem('nav');
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav__logo');
    expect(bem('', 'hover')).toBe('nav--hover');
  });

  test('change namespace', () => {
    const createBem = initialBem('my-namespace-');
    const bem = createBem('nav');
    expect(bem()).toBe('my-namespace-nav');
    expect(bem('logo')).toBe('my-namespace-nav__logo');
    expect(bem('', 'hover')).toBe('my-namespace-nav--hover');
  });

  test('change element concat', () => {
    const createBem = initialBem({ elementConcat: '_' });
    const bem = createBem('nav');
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav_logo');
    expect(bem('', 'hover')).toBe('nav--hover');
  });

  test('change modify concat', () => {
    const createBem = initialBem({ modifyConcat: '-' });
    const bem = createBem('nav');
    expect(bem()).toBe('nav');
    expect(bem('logo')).toBe('nav__logo');
    expect(bem('', 'hover')).toBe('nav-hover');
  });

  test('full change', () => {
    const createBem = initialBem({ namespace: 'my-namespace-', elementConcat: '_', modifyConcat: '-' });
    const bem = createBem('nav');
    expect(bem()).toBe('my-namespace-nav');
    expect(bem('logo')).toBe('my-namespace-nav_logo');
    expect(bem('', 'hover')).toBe('my-namespace-nav-hover');
  });
});
