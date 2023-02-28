## Usage

```js
import createBem from '@lai9fox/bem';
// The second parameter is optional and is used to modify the connection symbol.
// default value is { elementConcat: '__', modifierConcat: '--' }
const ops = { elementConcat: '_', modifierConcat: '-' };
const bem = createBem('block', ops);
```

## Conventions
- Extra modifier do not need to start with `:`
- Inline modifier take precedence over append modifier

## String type

```js
import createBem from '@lai9fox/bem';
const bem = createBem('body');

/**
 * element
 * result: 'body__input'
 */
bem('input');
/**
 * element, with append modifier
 * result: 'body__input--click'
 */
bem('input', 'click');


/**
 * modifier
 * result: 'body--hover'
 */
bem(':hover');
/**
 * modifier, with append modifier
 * result: 'body--hover'
 */
bem(':hover', 'click');


/**
 * element with inline modifier
 * result: 'body__input--focus'
 */
bem('input:focus');
/**
 * element with inline modifier, with append modifier
 * result: 'body__input--focus'
 */
bem('input:focus', 'click');
```
## Object type

```js
import createBem from '@lai9fox/bem';
const bem = createBem('body');

/**
 * element
 * result:
 * {
 *   'body__input': true,
 *   'body__video': false,
 *   'body__audio': -99,
 * }
 */
bem({
  input: true,
  video: false,
  audio: -99,
});

/**
 * modifier
 * result:
 * {
 *   'body--hover': true,
 *   'body--click': false,
 *   'body--move-in': -99,
 * }
 */
bem({
  ':hover': true,
  ':click': false,
  ':move-in': -99,
});

/**
 * modifier with inline modifier
 * result:
 * {
 *   'body__input--focus': true,
 *   'body__video--play': false,
 *   'body__audio--muted': -99,
 * }
 */
bem({
  'input:focus': true,
  'video:play': false,
  'audio:muted': -99,
});

/**
 * with append modifer
 * result:
 * {
 *   'body__input--focus': true,
 *   'body__video--hover': false,
 *   'body__audio--hover': -99,
 * }
 */
bem({
  'input:focus': true,
  'video': false,
  'audio': -99,
}, 'hover');
```

## Array type

```js
import createBem from '@lai9fox/bem';
const bem = createBem('body');

/**
 * element
 * result:
 * [
 *   'body__input',
 *   'body__button',
 * ]
 */
bem(['input', 'button']);

/**
 * element with inline modifier
 * result:
 * [
 *   'body__input',
 *   'body__button--click',
 * ]
 */
bem(['input', 'button:click']);

/**
 * with append modifier
 * result:
 * [
 *   'body__input--hover',
 *   'body__button--click',
 * ]
 */
bem(['input', 'button:click'], 'hover');

/**
 * nested object type in arrays
 * result:
 * [
 *   'body__select',
 *   'body__radio',
 *   {
 *     'body__form': true,
 *     'body__table': true,
 *   },
 * ]
 */
bem([
  'select',
  'radio',
  {
    form: true,
    table: true,
  }
]);
```
