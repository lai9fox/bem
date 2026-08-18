[中文文档](./README.md) · [Docs site](https://lai9fox.github.io/bem/en/)

# BEM Class Name Generator

`@lai9fox/bem` generates BEM class names through explicit methods. Every generator method returns a string that can be assigned directly to `class` or `className`; batches are joined with one ASCII space.

Full guide, API, and examples: [docs site](https://lai9fox.github.io/bem/en/).

## Create a generator

```ts
import { createBem } from "@lai9fox/bem";

const bem = createBem({
  namespace: "acme-",
  elementSeparator: "__",
  modifierSeparator: "--",
});

const button = bem.block("button");
```

The defaults are:

```ts
{
  namespace: '',
  elementSeparator: '__',
  modifierSeparator: '--',
}
```

## Generate one class

```ts
button.block(); // 'acme-button'
button.element("icon"); // 'acme-button__icon'
button.modifier("disabled"); // 'acme-button--disabled'
button.elementModifier("icon", "active"); // 'acme-button__icon--active'
```

## Generate homogeneous batches

Homogeneous batch methods accept name arrays, remove later duplicates, and return one space-separated string.

```ts
button.elements(["icon", "label"]);
// 'acme-button__icon acme-button__label'

button.modifiers(["disabled", "loading"]);
// 'acme-button--disabled acme-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'acme-button__icon--active acme-button__icon--loading'
```

An empty array returns `''`.

## Generate a mixed class string

Use `classes()` to describe block, element, modifier, and element-modifier classes together. Conditions use JavaScript truthiness: truthy values emit a class and falsy values omit it.

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

Output order is always `block`, `elements`, `modifiers`, then `elementModifiers`; each object uses JavaScript own-enumerable-property order. Complete class names are stably de-duplicated, preserving their first occurrence.

`classes()` never infers parent classes. `modifiers.disabled` emits only `block--disabled`, and `elementModifiers.icon.active` emits only `block__icon--active`. Declare the base class explicitly through `block` or `elements` when it is needed.

## Validation

- Block, element, and modifier names must be non-empty strings without whitespace.
- `namespace` may be empty but cannot contain whitespace.
- Separators must be non-empty strings without whitespace.
- Batch names must be arrays. `classes()` fields `elements`, `modifiers`, and `elementModifiers` must be non-null, non-array objects.
- `classes()` itself and every `elementModifiers` entry must also be non-null, non-array objects.

Structural errors throw `TypeError`. Names and separators are composed literally: the library does not parse generated output, so names may contain separators and distinct structures may generate the same class name.
