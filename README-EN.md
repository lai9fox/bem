[中文文档](./README.md) | [English Docs](./README-EN.md)

# BEM Class Name Generator

## Creating a Generator with Namespace

```javascript
import initialBem from '@lai9fox/bem';

const createBem1 = initialBem();
const bem1 = createBem1('blockName');
bem1(); // blockName

const createBem2 = initialBem('mynamespace-');
const bem2 = createBem2('blockName');
bem2(); // mynamespace-blockName

const createBem3 = initialBem({ namespace: 'mynamespace-', elementConcat: '_', modifyConcat: '-' });
const bem3 = createBem3('blockName');
bem3(); // mynamespace-blockName
bem3('element'); // mynamespace-blockName_element
bem3(':modifier'); // mynamespace-blockName-modifier
```

- `namespace`: The namespace, defaults to `''`.
- `elementConcat`: The connector between block and element, defaults to `__`.
- `modifyConcat`: The connector between block/element and modifier, defaults to `--`.

## Usage

After creating the generator, you can generate class names in three forms:

```javascript
const createBem = initialBem();
const bem = createBem('nav');
```

### String

You can generate class names with modifiers using inline modifiers, which have higher priority than the optional modifier parameter.

- If the string contains `:`, the part before `:` is treated as an element, and the part after as a modifier.
- If the string starts with `:`, it indicates a block modifier.
- The optional modifier parameter can be passed as the second argument but is ignored if an inline modifier is present.

```javascript
bem(''); // same as bem() => 'nav'
bem('', 'focus'); // 'nav--focus'
bem('search'); // 'nav__search'
bem(':focus'); // 'nav--focus'
bem(':hover', 'focus'); // 'nav--hover' (inline modifier takes precedence)
bem('search:focus'); // 'nav__search--focus'
bem('search', 'focus'); // 'nav__search--focus'
bem('search:disabled', 'focus'); // 'nav__search--disabled' (inline modifier takes precedence)
```

### Object

When using the object form, only properties with truthy values will generate corresponding class names.

- Keys can be element names, block modifiers (starting with `:`), or element-modifier combinations (`element:modifier`).
- If an optional modifier parameter is provided, it applies to elements without inline modifiers.

```javascript
bem({}); // []
bem({}, 'focus'); // []
bem({ search: true, logo: false }); // ['nav__search']
bem({ ':focus': true, ':hover': false }); // ['nav--focus']
bem({ ':active': true, ':hover': false }, 'focus'); // ['nav--active'] (inline modifier takes precedence)
bem({ 'search:focus': true, 'logo:hover': false }); // ['nav__search--focus']
bem({ search: true, logo: false }, 'disabled'); // ['nav__search--disabled']
bem({ 'search:focus': true, 'logo': true }, 'disabled'); // ['nav__search--focus', 'nav__logo--disabled']
```

### Array

The array form allows mixing strings and objects to generate multiple BEM class names.

- Each item in the array can be a string or an object.
- String items follow the string form rules.
- Object items follow the object form rules.
- The optional modifier parameter applies to elements without inline modifiers.

```javascript
bem([]); // []
bem([], 'hover'); // []
bem(['search', 'logo']); // ['nav__search', 'nav__logo']
bem([':hover', ':focus']); // ['nav--hover', 'nav--focus']
bem(['search:focus', 'logo:hover']); // ['nav__search--focus', 'nav__logo--hover']
bem(['search', 'logo'], 'disabled'); // ['nav__search--disabled', 'nav__logo--disabled']
bem(['search:focus', 'logo'], 'disabled'); // ['nav__search--focus', 'nav__logo--disabled']
bem(['search:focus', 'logo', { header: true, 'links:active': true }], 'disabled'); // ['nav__search--focus', 'nav__logo--disabled', 'nav__header--disabled', 'nav__links--active']
```