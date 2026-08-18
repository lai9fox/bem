[English](./README-EN.md) · [文档站点](https://lai9fox.github.io/bem/)

# BEM 类名生成器

`@lai9fox/bem` 用显式方法生成 BEM 类名。所有生成方法都返回一个可直接赋给 `class` 或 `className` 的字符串；批量结果使用单个空格连接。

完整指南、API 与示例见 [文档站点](https://lai9fox.github.io/bem/)。

## 安装与创建

```ts
import { createBem } from "@lai9fox/bem";

const bem = createBem({
  namespace: "acme-",
  elementSeparator: "__",
  modifierSeparator: "--",
});

const button = bem.block("button");
```

`createBem()` 的默认配置为：

```ts
{
  namespace: '',
  elementSeparator: '__',
  modifierSeparator: '--',
}
```

## 单个类名

```ts
button.block(); // 'acme-button'
button.element("icon"); // 'acme-button__icon'
button.modifier("disabled"); // 'acme-button--disabled'
button.elementModifier("icon", "active"); // 'acme-button__icon--active'
```

## 同类批量生成

同类批量方法接受名称数组、稳定去重，并返回单个空格连接的字符串。

```ts
button.elements(["icon", "label"]);
// 'acme-button__icon acme-button__label'

button.modifiers(["disabled", "loading"]);
// 'acme-button--disabled acme-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'acme-button__icon--active acme-button__icon--loading'
```

空数组返回 `''`。

## 混合生成

使用 `classes()` 一次声明 block、element、modifier 和 element modifier。每个条件值按 JavaScript truthiness 判断：truthy 输出，falsy 忽略。

```ts
button.classes({
  block: true,
  elements: {
    icon: true,
    label: showLabel,
  },
  modifiers: {
    disabled: isDisabled,
  },
  elementModifiers: {
    icon: { active: isActive },
  },
});
// 'acme-button acme-button__icon acme-button__label acme-button--disabled acme-button__icon--active'
```

输出顺序固定为 `block`、`elements`、`modifiers`、`elementModifiers`；每个对象内部遵循 JavaScript 自有可枚举属性顺序。生成的完整类名稳定去重，保留首次出现的位置。

`classes()` 不会隐式补充父类：`modifiers.disabled` 只输出 `block--disabled`，`elementModifiers.icon.active` 只输出 `block__icon--active`。如需 block 或 element 基础类，请在对应的 `block` 或 `elements` 字段中显式声明。

## 校验规则

- block、element 和 modifier 必须是非空且不含空白的字符串。
- `namespace` 可以为空，但不得包含空白。
- 两个连接符必须是非空且不含空白的字符串。
- 批量名称必须是数组；`classes()` 的 `elements`、`modifiers` 和 `elementModifiers` 必须是非 `null`、非数组对象。
- `classes()` 自身及其每个 `elementModifiers` 条目也必须是非 `null`、非数组对象。

结构错误会抛出 `TypeError`。名称和连接符采用原样拼接：库不会解析生成结果，因此名称中允许出现连接符，且不同结构可以得到相同的类名。
