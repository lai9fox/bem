---
title: BEM TypeScript API reference
description: Complete createBem and BemBlock types, configuration defaults, batch methods, classes() output order, deduplication, and TypeError validation rules.
locale: en
---

This page defines the public interfaces and behavior of `@lai9fox/bem`. Start with the [guide](/en/guide/) for your first component, or see [React / Vue examples](/en/examples/) for integration.

## createBem(options?)

The signature is `createBem(options?: BemOptions): BemFactory`. It returns a frozen factory; `bem.block(name)` returns a frozen `BemBlock`. Every class name generator method returns a `string`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `namespace` | `string` | `''` | Literal prefix; may be empty, no whitespace |
| `elementSeparator` | `string` | `'__'` | Element separator; non-empty, no whitespace |
| `modifierSeparator` | `string` | `'--'` | Modifier separator; non-empty, no whitespace |

Omitted options and `undefined` use the defaults. `null` does not select a default. The namespace does not get an extra separator: `ui-` and `ui` are different prefixes.

## Single class names

These examples share one generator:

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.block(); // 'ui-button'
button.element("icon"); // 'ui-button__icon'
button.modifier("disabled"); // 'ui-button--disabled'
button.elementModifier("icon", "active"); // 'ui-button__icon--active'
```

`modifier()` and `elementModifier()` each return one modifier class without adding the block or element base class.

## Batch generation

Continue with `button` above. Batch methods accept `readonly string[]`, preserve input order, join with one ASCII space, and remove duplicates while keeping the first occurrence. Empty arrays return `''`.

```ts
button.elements(["icon", "label", "icon"]);
// 'ui-button__icon ui-button__label'

button.modifiers(["disabled", "loading"]);
// 'ui-button--disabled ui-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'ui-button__icon--active ui-button__icon--loading'

button.elements([]); // ''
```

`elements()` returns a string containing several element classes; it does not create or assign DOM elements. Use `element(name)` to set the class on each separate node.

## Conditional composition with classes()

`classes(input: ClassInput): string` generates one class string from conditions. Continue with `button` above:

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

- Conditions use JavaScript truthiness: `true`, non-empty strings (including `'false'`), non-zero numbers, and objects emit classes; `false`, `0`, `''`, `null`, `undefined`, and `NaN` do not.
- Output order is always `block` → `elements` → `modifiers` → `elementModifiers`, regardless of how these four fields are declared.
- Each condition object follows JavaScript own-enumerable-string-property order (`Object.keys`); integer index keys appear in numeric order.
- Complete class names are deduplicated after composition, keeping their first occurrence.
- Parent classes are never inferred. Declare `block: true` or `elements: { icon: true }` when you need base styles.

## Validation and errors

Invalid structures or names throw `TypeError`:

| Input | Requirement |
| --- | --- |
| `options` | Omitted, `undefined`, or a non-null, non-array object |
| Block / element / modifier names | Non-empty strings without whitespace |
| Batch names | An array whose names satisfy the name rules |
| `classes(input)` argument | A non-null, non-array object |
| `elements` / `modifiers` / `elementModifiers` | Omitted, `undefined`, or a non-null, non-array object |
| Each `elementModifiers` entry | A non-null, non-array object |

`classes()` validates names only when they are emitted. Names behind falsy conditions are skipped, but the object structures above are still validated. `elementModifiers(element, [])` returns an empty string but still requires a valid element name.

Names and separators are concatenated literally, without parsing, sanitizing, or CSS escaping. Names may contain separators, and distinct input structures may produce the same class name. If a name contains CSS special characters, your application must escape selectors appropriately.

## Exported types

All five types below can be imported with `import type { … } from "@lai9fox/bem"`:

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

See [shared configuration](/en/examples/#shared-configuration) for a project structure that reuses one factory.
