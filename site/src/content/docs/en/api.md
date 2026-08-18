---
title: API reference
description: createBem, BemBlock methods, and validation rules.
locale: en
---

## createBem(options?)

Creates a frozen `BemFactory`.

| Option              | Type     | Default | Notes                                        |
| ------------------- | -------- | ------- | -------------------------------------------- |
| `namespace`         | `string` | `''`    | Class prefix; may be empty, no whitespace    |
| `elementSeparator`  | `string` | `'__'`  | Element separator; non-empty, no whitespace  |
| `modifierSeparator` | `string` | `'--'`  | Modifier separator; non-empty, no whitespace |

```ts
const bem = createBem({ namespace: "acme-" });
const button = bem.block("button");
```

## bem.block(name)

Returns a `BemBlock` for one block. `name` must be non-empty without whitespace.

## BemBlock methods

| Method                                 | Returns                                       |
| -------------------------------------- | --------------------------------------------- |
| `block()`                              | `namespace + block`                           |
| `element(name)`                        | block class + element separator + name        |
| `modifier(name)`                       | block class + modifier separator + name       |
| `elementModifier(element, modifier)`   | element class + modifier separator + modifier |
| `elements(names)`                      | multiple elements, space-joined               |
| `modifiers(names)`                     | multiple modifiers, space-joined              |
| `elementModifiers(element, modifiers)` | modifiers for one element                     |
| `classes(input)`                       | conditional mixed output                      |

Batch helpers de-duplicate names stably.

### classes(input)

```ts
interface ClassInput {
  block?: unknown;
  elements?: Record<string, unknown>;
  modifiers?: Record<string, unknown>;
  elementModifiers?: Record<string, Record<string, unknown>>;
}
```

- truthy → emit, falsy → skip
- no implicit parent classes
- `elements` / `modifiers` / `elementModifiers` must be non-null, non-array objects

## Validation

- block / element / modifier: non-empty, no whitespace
- `namespace`: may be `''`, no whitespace
- separators: non-empty, no whitespace
- structural mistakes throw `TypeError`

Names are concatenated as-is; the library does not parse output. Separator characters may appear inside names.

## Exported types

`BemOptions` · `BemFactory` · `BemBlock` · `ClassInput` · `Conditions`
