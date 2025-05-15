[中文文档](./README.md) | [English Docs](./README-EN.md)

## 创建命名空间下的生成器

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
- `namespace` 命名空间，默认值为 `''`
- `elementConcat` 定义块与元素的连接符，默认值为 `__`
- `modifyConcat` 块或者元素与修饰符的连接符，默认值为 `--`

## 使用

创建生成器后，可通过以下 3 种形式生成类名

```javascript
const createBem = initialBem();
const bem = createBem('nav');
```

### 字符串

可以通过字符串形式生成BEM类名。字符串可以包含内联修饰符，通过 : 分割。内联修饰符的优先级高于可选的修饰符参数。

- 如果字符串中包含 `:`，则 `:` 之前的部分被视为元素，之后的部分被视为修饰符。
- 如果字符串以 `:` 开头，则表示块的修饰符。
- 可选的修饰符参数可以作为第二个参数传入，但在有内联修饰符时会被忽略。

```javascript
bem(''); // 等同于 bem() => 'nav'
bem('', 'focus'); // 'nav--focus'
bem('search'); // 'nav__search'
bem(':focus'); // 'nav--focus'
bem(':hover', 'focus'); // 'nav--hover'（内联修饰符优先）
bem('search:focus'); // 'nav__search--focus'
bem('search', 'focus'); // 'nav__search--focus'
bem('search:disabled', 'focus'); // 'nav__search--disabled'（内联修饰符优先）
```

### 对象

使用对象形式时，对象的键表示元素或修饰符，值为真时才会生成对应的类名。

- 键可以是元素名、块修饰符（以 `:` 开头）、或元素与修饰符的组合（`element:modifier`）。
- 如果传入可选修饰符参数，它会应用到没有内联修饰符的元素上。

```javascript
bem({}); // []
bem({}, 'focus'); // []
bem({ search: true, logo: false }); // ['nav__search']
bem({ ':focus': true, ':hover': false }); // ['nav--focus']
bem({ ':active': true, ':hover': false }, 'focus'); // ['nav--active']（内联修饰符优先）
bem({ 'search:focus': true, 'logo:hover': false }); // ['nav__search--focus']
bem({ search: true, logo: false }, 'disabled'); // ['nav__search--disabled']
bem({ 'search:focus': true, 'logo': true }, 'disabled'); // ['nav__search--focus', 'nav__logo--disabled']
```

### 数组

数组形式允许混合使用字符串和对象来生成多个BEM类名。

- 数组中的每个元素可以是字符串或对象。
- 字符串元素遵循字符串形式的规则。
- 对象元素遵循对象形式的规则。
- 可选修饰符参数会应用到没有内联修饰符的元素上。

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
