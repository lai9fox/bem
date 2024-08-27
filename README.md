[中文文档](./README.md) | [English Docs](./README-EN.md)

## 创建命名空间下的生成器

```javascript
import createBem from '@lai9fox/bem';
createBem.setConcat({ elementConcat: '__', modifyConcat: '--' }); // 可选
const bem = createBem('nav');
bem(); // nav
```

`createBem.setConcat` 用于定义命名空间与元素的连接符 `elementConcat`，元素或者命名空间与修饰符的连接符 `modifyConcat`，默认值为 `{ elementConcat: '__', modifyConcat: '--' }`

创建生成器后，可通过以下 3 种形式生成类名

## 字符串

可以通过内联修饰符的方式来生成带修饰符的类名，内联修饰符的优先级大于可选修饰符参数

内联修饰符通过 `:` 分割，可选修饰符不需要添加 `:`

### 函数签名

```typescript
function bem(em: string, modify?: string): string
```

### 使用示例

```javascript
bem(''); // 同 bem() => nav
bem('', 'focus'); // nav--focus
bem('search'); // nav__search
bem(':focus'); // nav--focus
bem(':hover', 'focus'); // nav--hover
bem('search:focus'); // nav__search--focus
bem('search', 'focus'); // nav__search--focus
bem('search:disabled', 'focus'); // nav__search--disabled
```

## 对象

使用对象形式时，只有真值的属性才会生成对应的类名

### 函数签名

```typescript
function bem(em: object, modify?: string): string[]
```

### 使用示例

```javascript
bem({}); // []
bem({}, 'focus'); // []
bem({ search: true, logo: false }); // ['nav__search']
bem({ ':focus': true, ':hover': false }); // ['nav--focus']
bem({ ':active': true, ':hover': false }, 'focus'); // ['nav--active']
bem({ 'search:focus': true, 'logo:hover': false }); // ['nav__search--focus']
bem({ search: true, logo: false }, 'disabled'); // ['nav__search--disabled']
bem({ 'search:focus': true, 'logo': true }, 'disabled'); // ['nav__search--focus', 'nav__logo--disabled']
```
## 数组

可以在数组的形式中嵌套使用对象形式

### 函数签名

```typescript
function bem(em: (string | object)[], modify?: string): string[]
```

### 使用示例

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
