---
title: Getting started
description: Use @lai9fox/bem to create a button with an icon, add styles, and update classes based on its disabled state.
locale: en
---

BEM class names have three parts:

- **Block**: the component itself, such as `button`.
- **Element**: a part of the component, such as `button__icon`.
- **Modifier**: a variation or state of a block or element, such as `button--disabled`.

## Install

```bash
npm i @lai9fox/bem
```

## Create the button and icon

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

The resulting HTML:

```html
<button type="button" class="ui-button">
  <span class="ui-button__icon" aria-hidden="true">↓</span>
  Download
</button>
```

`namespace` sets the class name prefix. Here, `ui-` includes the trailing `-`. Omit this option to get `button`.

## Add CSS

Add this CSS to a stylesheet your project loads:

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

`block: true` adds the base class `ui-button`. When `disabled` is `true`, it also adds `ui-button--disabled`. Classes control styles; set `node.disabled` to disable the button.

## Next steps

- [examples](/en/examples/): use the library in components.
- [Shared configuration](/en/examples/#shared-configuration): reuse class name prefixes and separators.
- [API reference](/en/api/): look up methods, types, and configuration.
