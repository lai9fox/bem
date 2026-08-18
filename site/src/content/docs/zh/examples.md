---
title: 示例
description: "按钮、条件 modifier、批量 element 等常见 BEM 类名写法，可直接用于 TypeScript 项目。"
locale: zh
---

## 基础按钮

创建 block，再按需生成 element 或 modifier：

```ts
import { createBem } from "@lai9fox/bem";

const bem = createBem({ namespace: "ui-" });
const btn = bem.block("button");

btn.block();
// 'ui-button'

btn.element("label");
// 'ui-button__label'

btn.modifier("primary");
// 'ui-button--primary'
```

## 条件 className

根据 props 用 `classes()` 一次拼出完整类名：

```ts
function buttonClassName({
  disabled,
  iconActive,
}: {
  disabled: boolean;
  iconActive: boolean;
}) {
  const btn = createBem({ namespace: "ui-" }).block("button");
  return btn.classes({
    block: true,
    elements: { icon: true },
    modifiers: { disabled },
    elementModifiers: {
      icon: { active: iconActive },
    },
  });
}

buttonClassName({ disabled: true, iconActive: true });
// 'ui-button ui-button__icon ui-button--disabled ui-button__icon--active'
```

## 批量 elements / modifiers

卡片等多段结构，一次列出所有子元素或状态：

```ts
const card = createBem().block("card");

card.elements(["header", "body", "footer"]);
// 'card__header card__body card__footer'

card.modifiers(["elevated", "compact"]);
// 'card--elevated card--compact'
```

## 自定义连接符

命名空间与连接符可按项目约定自由组合：

```ts
const bem = createBem({
  namespace: "app_",
  elementSeparator: "-",
  modifierSeparator: "_",
});

const nav = bem.block("nav");
nav.elementModifier("item", "current");
// 'app_nav-item_current'
```
