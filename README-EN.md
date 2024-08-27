[中文文档](./README.md) | [English Docs](./README-EN.md)

## Create a Generator Under a Namespace

```javascript
import createBem from '@lai9fox/bem';
createBem.setConcat({ elementConcat: '__', modifyConcat: '--' }); // Optional
const bem = createBem('nav');
bem(); // 'nav'
```

The `createBem.setConcat` method is used to define the concatenation symbols: `elementConcat` for the connection between the namespace and the element, and `modifyConcat` for the connection between the element or namespace and the modifier. The default values are `{ elementConcat: '__', modifyConcat: '--' }`.

After creating the generator, class names can be generated in the following 3 forms:

## String

Inline modifiers can be used to generate class names with modifiers. The priority of inline modifiers is higher than that of optional modifier parameters.

Inline modifiers are separated by `:`, and optional modifiers are not prefixed with `:`.

### Function signature

```typescript
function bem(em: string, modify?: string): string
```

### Usage examples:

```javascript
bem(''); // same as bem() => 'nav'
bem('', 'focus'); // 'nav--focus'
bem('search'); // 'nav__search'
bem(':focus'); // 'nav--focus'
bem(':hover', 'focus'); // 'nav--hover'
bem('search:focus'); // 'nav__search--focus'
bem('search', 'focus'); // 'nav__search--focus'
bem('search:disabled', 'focus'); // 'nav__search--disabled'
```

## Object

When using the object form, only truthy properties will generate corresponding class names.

### Function signature

```typescript
function bem(em: object, modify?: string): string[]
```

### Usage examples:

```javascript
bem({}); // []
bem({}, 'focus'); // []
bem({ search: true, logo: false }); // ['nav__search']
bem({ ':focus': true, ':hover': false }); // ['nav--focus']
bem({ ':active': true, ':hover': false }, 'focus'); // ['nav--active']
bem({ 'search:focus': true, 'logo:hover': false }); // ['nav__search--focus']
bem({ search: true, logo: false }, 'disabled'); // ['nav__search--disabled']
bem({ 'search:focus': true, logo: true }, 'disabled'); // ['nav__search--focus', 'nav__logo--disabled']
```

## Array

The object form can be nested within the array form.

### Function signature

```typescript
function bem(em: (string | object)[], modify?: string): string[]
```

### Usage examples:

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
