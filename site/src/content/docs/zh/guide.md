---
title: 快速上手
description: "安装 @lai9fox/bem，配置 namespace 与连接符，用 createBem 生成第一个 BEM 类名。"
locale: zh
---

## 安装

```bash
npm i @lai9fox/bem
```

## 创建生成器

用 `createBem` 设定命名空间与连接符，再为每个 block 创建生成器：

```ts
import { createBem } from "@lai9fox/bem";

const bem = createBem({
  namespace: "acme-",
  elementSeparator: "__",
  modifierSeparator: "--",
});

const button = bem.block("button");
```

默认配置：

```ts
{
  namespace: '',
  elementSeparator: '__',
  modifierSeparator: '--',
}
```

## 单个类名

四种基本用法：

```ts
button.block(); // 'acme-button'
button.element("icon"); // 'acme-button__icon'
button.modifier("disabled"); // 'acme-button--disabled'
button.elementModifier("icon", "active"); // 'acme-button__icon--active'
```

## 批量生成

一次生成多个同类类名，空格连接；空数组返回 `''`，重复名称稳定去重：

```ts
button.elements(["icon", "label"]);
// 'acme-button__icon acme-button__label'

button.modifiers(["disabled", "loading"]);
// 'acme-button--disabled acme-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'acme-button__icon--active acme-button__icon--loading'
```

## 条件组合 `classes()`

根据组件状态一次输出多个类名。条件值按 JavaScript truthiness 判断；顺序固定为 `block` → `elements` → `modifiers` → `elementModifiers`：

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
```

`classes()` 不会隐式补父类——需要 block 或 element 基础类时，请在对应字段里显式声明。

更多细节参考 [API](/api/) 或者 [示例](/examples/)。
