## 使用

```js
import defineBem from '@lai9fox/bem';
const createBem = defineBem('prefix', { elementConcat: '__', modifierConca: '--' });

const navBem = createBem('nav');
navBem(); // prefix-nav
navBem('input'); // prefix-nav__input
```

## `defineBem(prefix?：string，config?：object)`

配置 bem 的行为表现，参数：

- `prefix`：全局类名前缀，将以`${prefix}-`进行拼接，默认无前缀。
- `config`：类名生成时的连接符，块与元素的默认连接符为：`__`; 块与修饰符、元素与修饰符的默认连接符为：`--`。

## 创建 `bem` 生成器

```js
import defineBem from '@lai9fox/bem';
const createBem = defineBem();
const navBem = createBem('nav');
```

通过上述代码，创建一个 `nav` 命名块的 `bem` 构造器。
在使用 `createBem` 生成 `bem` 构造器时，一个字符串类型的命名空间是必须的。

## 规则

假设通过上述代码创建了一个 `bem` 构造器。

```js
const createBem = defineBem('pre');
const navBem = createBem('nav');
```

构造器接收两个参数：
- 第一个参数为`bem`中的`e`值，可附带内联修饰符，内联修饰符需以`:`分割，优先级高于附加修饰符。
- 第二个参数为可选修饰符，将作用于第一个参数的所有值，优先级低于内联修饰符。

### 字符串形式

```js
navBem('input'); // pre-nav__input
navBem('input', 'click'); // pre-nav__input--click
navBem('input:focus', 'click'); // pre-nav__input--focus
navBem('', 'click'); // pre-nav--hover
navBem(':focus', 'click'); // pre-nav--focus
```

### 对象形式

```js
navBem({ input: true, button: false }); // ['pre-nav__input']
navBem({ input: true, button: false }, 'click'); // ['pre-nav__input--click']
navBem({ 'input:focus': true, button: false }, 'click'); // ['pre-nav__input--focus']
navBem({}, 'click'); // []
navBem({ ':focus': true, ':blur': false }, 'click'); // ['pre-nav--focus']
```

### 数组形式（可嵌套对象形式）

```js
navBem(['input', 'button']); // ['pre-nav__input', 'pre-nav__button']
navBem(['input', 'button'], 'click'); // ['pre-nav__input--click', 'pre-nav__button--click']
navBem(['input:focus', 'button'], 'click'); // ['pre-nav__input--focus', 'pre-nav__button--click']
navBem([], 'click'); // []

/**
 * 对象嵌套
 * [
 *   'pre-nav__input--click',
 *   'pre-nav__input--focus',
 *   'pre-nav__button--click',
 *   'pre-nav__button--focus',
 * ]
 */
navBem(['input', 'input:focus', { button: true, 'button:focus': true, 'button:blur': false }], 'click');
```