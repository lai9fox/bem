---
title: React and Vue examples
description: Update button and icon classes based on download state, and share naming configuration across components.
locale: en
---

These examples work in React with TypeScript or Vue 3.3+. [Install @lai9fox/bem](/en/guide/), choose the component for your framework, and add `button.css` below.

## React: download button

Save as `DownloadButton.tsx`. The parent handles downloads through `onDownload` and passes `loading={true}` while downloading. The class name generator is created outside the component and uses props to generate classes on each render.

```tsx
import { createBem } from "@lai9fox/bem";
import "./button.css";

const button = createBem({ namespace: "ui-" }).block("button");

type DownloadButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onDownload: () => void;
};

export function DownloadButton({
  disabled = false,
  loading = false,
  onDownload,
}: DownloadButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onDownload}
      className={button.classes({
        block: true,
        modifiers: { disabled: disabled || loading, loading },
      })}
    >
      <span
        aria-hidden="true"
        className={button.classes({
          elements: { icon: true },
          elementModifiers: { icon: { loading } },
        })}
      >
        {loading ? "…" : "↓"}
      </span>
      {loading ? "Downloading" : "Download"}
    </button>
  );
}
```

## Vue: reactive download state

Save as `DownloadButton.vue`. The parent passes state through `:loading="loading"` and handles downloads with `@download="startDownload"`. The computed values update class names when the relevant props change.

```vue
<script setup lang="ts">
import { computed } from "vue";
import { createBem } from "@lai9fox/bem";
import "./button.css";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
  }>(),
  { disabled: false, loading: false },
);

const emit = defineEmits<{ download: [] }>();
const button = createBem({ namespace: "ui-" }).block("button");
const buttonClass = computed(() =>
  button.classes({
    block: true,
    modifiers: {
      disabled: props.disabled || props.loading,
      loading: props.loading,
    },
  }),
);
const iconClass = computed(() =>
  button.classes({
    elements: { icon: true },
    elementModifiers: { icon: { loading: props.loading } },
  }),
);
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :class="buttonClass"
    @click="emit('download')"
  >
    <span :class="iconClass" aria-hidden="true">{{
      props.loading ? "…" : "↓"
    }}</span>
    {{ props.loading ? "Downloading" : "Download" }}
  </button>
</template>
```

## Styles and output

Create `button.css` in the component's directory:

```css
.ui-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid currentColor;
  background: white;
  color: #14532d;
}

.ui-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button--loading {
  cursor: wait;
}

.ui-button__icon {
  margin-inline-end: 0.5rem;
}

.ui-button__icon--loading {
  font-weight: 700;
}
```

During a download, the class names are:

- Button: `ui-button ui-button--disabled ui-button--loading`.
- Icon `span`: `ui-button__icon ui-button__icon--loading`.

The `disabled` attribute disables the button, `aria-busy` marks it as busy, and classes control styles. The parent manages download state and requests. See the [classes() API](/en/api/#conditional-composition-with-classes) for condition rules.

## Shared configuration

Create a factory in `bem.ts`. Each component can import it and call `bem.block(name)`. This navigation example adds a modifier class to the current item:

```ts
// bem.ts
import { createBem } from "@lai9fox/bem";

export const bem = createBem({ namespace: "ui-" });
```

```ts
// navigation.ts
import { bem } from "./bem";

const nav = bem.block("nav");

export function navigationItemClass(current: boolean) {
  return nav.classes({
    elements: { item: true },
    elementModifiers: { item: { current } },
  });
}

navigationItemClass(true);
// 'ui-nav__item ui-nav__item--current'
```

The button component can also import this `bem` and call `bem.block("button")`. If you change the class name prefix or separators, update the CSS selectors too. See [createBem](/en/api/#createbemoptions) for configuration options.
