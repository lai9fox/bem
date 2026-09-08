[中文](./README.md) · [Docs site](https://bem.fox9.dev/en/)

# TypeScript BEM class name generator

`@lai9fox/bem` generates block, element, and modifier class names through explicit methods. It includes TypeScript declarations and returns strings for `class` / `className`, with no UI framework dependency.

## Install

```bash
npm i @lai9fox/bem
```

## Quick example

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.classes({ block: true, modifiers: { disabled: true } });
// 'ui-button ui-button--disabled'

button.element("icon");
// 'ui-button__icon'
```

The first class string belongs on the button; the second belongs on its icon. Your application defines the styles and DOM.

## Documentation

- [Getting started](https://bem.fox9.dev/en/guide/): build a button and connect its class names, DOM, and CSS.
- [API reference](https://bem.fox9.dev/en/api/): all methods, defaults, batches, conditions, and validation rules.
- [React / Vue examples](https://bem.fox9.dev/en/examples/): complete components and shared project configuration.

## License

[MIT](./LICENSE)
