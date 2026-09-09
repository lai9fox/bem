---
title: API reference
description: Methods, types, configuration, and validation rules for @lai9fox/bem.
locale: en
---

New to the library? Start with [Getting started](/en/guide/) or the [examples](/en/examples/).

## createBem(options?)

`createBem(options?: BemOptions): BemFactory` creates a factory. Call `bem.block(name)` to create a component's class name generator, a `BemBlock`. Both objects are frozen with `Object.freeze()`. All class name methods return a `string`.

| Option              | Type     | Default | Description                                    |
| ------------------- | -------- | ------- | ---------------------------------------------- |
| `namespace`         | `string` | `''`    | Class name prefix; may be empty, no whitespace |
| `elementSeparator`  | `string` | `'__'`  | Element separator; non-empty, no whitespace    |
| `modifierSeparator` | `string` | `'--'`  | Modifier separator; non-empty, no whitespace   |

Omitted options and `undefined` use the defaults; `null` throws `TypeError`. No separator is added after `namespace`: the prefix `ui-` produces `ui-button`, while `ui` produces `uibutton`.

## Single class names

Create a class name generator for a button:

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.block(); // 'ui-button'
button.element("icon"); // 'ui-button__icon'
button.modifier("disabled"); // 'ui-button--disabled'
button.elementModifier("icon", "active"); // 'ui-button__icon--active'
```

`modifier()` and `elementModifier()` return only the modifier class. To include the base class, use `classes()` below.

## Batch generation

Batch methods accept `readonly string[]` and generate classes in input order, joined by a single space (U+0020). Duplicate classes are removed, keeping the first occurrence. Empty arrays return `''`.

```ts
button.elements(["icon", "label", "icon"]);
// 'ui-button__icon ui-button__label'

button.modifiers(["disabled", "loading"]);
// 'ui-button--disabled ui-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'ui-button__icon--active ui-button__icon--loading'

button.elements([]); // ''
```

To assign classes to separate DOM nodes, call `element(name)` for each node.

## Conditional composition with classes()

`classes(input: ClassInput): string` combines class names based on conditions:

```ts
button.classes({
  block: true,
  modifiers: { disabled: true, loading: false },
});
// 'ui-button ui-button--disabled'

button.classes({
  elements: { icon: true },
  elementModifiers: { icon: { active: true } },
});
// 'ui-button__icon ui-button__icon--active'

button.classes({ modifiers: { disabled: true } });
// 'ui-button--disabled'

button.classes({}); // ''
```

- Classes are added when their conditions are truthy in JavaScript. For example, `true`, non-empty strings (including `'false'`), and objects are truthy; `false`, `0`, `''`, `null`, `undefined`, and `NaN` are falsy.
- Output order is always `block` → `elements` → `modifiers` → `elementModifiers`, regardless of field order in the input.
- Condition objects are read in `Object.keys()` order: only their own enumerable string keys are processed, with integer index keys sorted numerically.
- Duplicate class names are removed, keeping the first occurrence. Classes are joined by a single space.
- Add base classes explicitly with `block: true` or `elements: { icon: true }`. Modifier classes do not add base classes automatically.

## Validation and errors

Inputs that do not meet these requirements throw `TypeError`:

| Input                                         | Requirement                                           |
| --------------------------------------------- | ----------------------------------------------------- |
| `options`                                     | Omitted, `undefined`, or a non-null, non-array object |
| Block / element / modifier names              | Non-empty strings without whitespace                  |
| Batch name arguments                          | An array of names that follow the rules above         |
| `classes(input)` argument                     | A non-null, non-array object                          |
| `elements` / `modifiers` / `elementModifiers` | Omitted, `undefined`, or a non-null, non-array object |
| Each `elementModifiers` entry                 | A non-null, non-array object                          |

`classes()` validates only names used by truthy conditions, but always checks the object structures above. `elementModifiers(element, [])` returns an empty string and still validates the element name.

Names and separators are joined as provided. Names can contain separators, so different inputs may produce the same class name. The library does not escape CSS: if names contain special CSS characters, escape them when writing selectors.

## Exported types

Import these types with `import type { … } from "@lai9fox/bem"`:

```ts
interface BemOptions {
  namespace?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
}

type Conditions = Readonly<Record<string, unknown>>;

interface ClassInput {
  block?: unknown;
  elements?: Conditions;
  modifiers?: Conditions;
  elementModifiers?: Readonly<Record<string, Conditions>>;
}

interface BemFactory {
  block(name: string): BemBlock;
}

interface BemBlock {
  block(): string;
  element(name: string): string;
  modifier(name: string): string;
  elementModifier(element: string, modifier: string): string;
  elements(names: readonly string[]): string;
  modifiers(names: readonly string[]): string;
  elementModifiers(element: string, modifiers: readonly string[]): string;
  classes(input: ClassInput): string;
}
```

Multiple components can reuse one factory. See [Shared configuration](/en/examples/#shared-configuration).
