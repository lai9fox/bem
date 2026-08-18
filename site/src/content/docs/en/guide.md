---
title: Guide
description: Install, configure, and generate your first BEM class names.
locale: en
---

## Install

```bash
npm i @lai9fox/bem
```

## Create a generator

Use `createBem` to set your namespace and separators, then create a generator for each block:

```ts
import { createBem } from "@lai9fox/bem";

const bem = createBem({
  namespace: "acme-",
  elementSeparator: "__",
  modifierSeparator: "--",
});

const button = bem.block("button");
```

Defaults:

```ts
{
  namespace: '',
  elementSeparator: '__',
  modifierSeparator: '--',
}
```

## Single class names

Four basic usage:

```ts
button.block(); // 'acme-button'
button.element("icon"); // 'acme-button__icon'
button.modifier("disabled"); // 'acme-button--disabled'
button.elementModifier("icon", "active"); // 'acme-button__icon--active'
```

## Batch generation

Generate multiple names of the same kind in one call, space-joined. Empty arrays return `''`; duplicates are removed stably:

```ts
button.elements(["icon", "label"]);
// 'acme-button__icon acme-button__label'

button.modifiers(["disabled", "loading"]);
// 'acme-button--disabled acme-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'acme-button__icon--active acme-button__icon--loading'
```

## Conditional mix with `classes()`

Emit several class names from component state in one call. Values use JavaScript truthiness; order is always `block` → `elements` → `modifiers` → `elementModifiers`:

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

`classes()` does not infer parent classes—declare block or element bases explicitly when you need them.

See the [API](/en/api/) or [examples](/en/examples/) for more detail.
