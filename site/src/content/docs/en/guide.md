---
title: BEM getting started guide
description: Install @lai9fox/bem and build an icon button with TypeScript, connecting BEM class names to DOM elements, CSS, and disabled state.
locale: en
---

This tutorial builds a button with browser DOM APIs in an existing TypeScript frontend project. In BEM, a block represents a component (`button`), an element represents a part of it (`button__icon`), and a modifier represents a variation or state (`button--disabled`).

## Install

```bash
npm i @lai9fox/bem
```

## Create the button and icon

Add this code to your browser entry file and run it after the page DOM has loaded:

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");
const node = document.createElement("button");
node.type = "button";
node.className = button.block();

const icon = document.createElement("span");
icon.className = button.element("icon");
icon.setAttribute("aria-hidden", "true");
icon.textContent = "↓";

node.append(icon, "Download");
document.body.append(node);
```

The resulting structure gives the button and icon their own class names:

```html
<button type="button" class="ui-button">
  <span class="ui-button__icon" aria-hidden="true">↓</span>
  Download
</button>
```

`namespace: "ui-"` adds the prefix literally, including the trailing `-`. Without this option, the button class is `button`.

## Add CSS

Put these rules in a stylesheet your project loads. The generator returns strings; CSS defines their appearance:

```css
.ui-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  background: white;
  color: #14532d;
}

.ui-button__icon {
  margin-inline-end: 0.5rem;
}

.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Update classes from state

Continue the TypeScript code above with a function that updates the button:

```ts
function setDisabled(disabled: boolean) {
  node.disabled = disabled;
  node.className = button.classes({
    block: true,
    modifiers: { disabled },
  });
}

setDisabled(true);
// node.className: 'ui-button ui-button--disabled'

setDisabled(false);
// node.className: 'ui-button'
```

`block: true` keeps the base styles, while `disabled` controls the modifier class. The native `disabled` property disables interaction; the class controls appearance. A modifier class alone does not disable the button.

## Next steps

- Use React or Vue: [complete component examples](/en/examples/).
- Standardize naming across a project: [shared configuration](/en/examples/#shared-configuration).
- Look up separators, batch methods, and conditions: [API reference](/en/api/).
