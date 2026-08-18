---
title: Examples
description: "Copy-ready TypeScript examples for common BEM class names: buttons, conditional modifiers, and batched elements."
locale: en
---

## Basic button

Create a block, then add elements or modifiers as needed:

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

## Conditional className

Use `classes()` to build the full class string from props:

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

## Batched elements / modifiers

For multi-part layouts like cards, list every sub-element or state in one call:

```ts
const card = createBem().block("card");

card.elements(["header", "body", "footer"]);
// 'card__header card__body card__footer'

card.modifiers(["elevated", "compact"]);
// 'card--elevated card--compact'
```

## Custom separators

Namespace and separators follow whatever convention your project uses:

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
