---
title: React and Vue BEM component examples
description: Build React and Vue download buttons with @lai9fox/bem, separate button and icon state classes, and reuse a shared naming configuration.
locale: en
---

These examples target existing React TypeScript or Vue 3.3+ projects. [Install @lai9fox/bem](/en/guide/), choose the component for your framework, and add the shared `button.css` below. For the relationship between DOM and CSS, read the [getting started guide](/en/guide/).

## React: download button

Save as `DownloadButton.tsx`. The parent supplies `onDownload` and passes `loading={true}` during the download. The generator lives outside the component; each render computes class names from props.

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

Save as `DownloadButton.vue`. The parent passes state with `:loading="loading"` and handles `@download="startDownload"`. The computed values regenerate class names whenever the props change.

```vue
<script setup lang="ts">
import { computed } from "vue";
import { createBem } from "@lai9fox/bem";
import "./button.css";

const props = withDefaults(defineProps<{
  disabled?: boolean;
  loading?: boolean;
}>(), { disabled: false, loading: false });

const emit = defineEmits<{ download: [] }>();
const button = createBem({ namespace: "ui-" }).block("button");
const buttonClass = computed(() => button.classes({
  block: true,
  modifiers: { disabled: props.disabled || props.loading, loading: props.loading },
}));
const iconClass = computed(() => button.classes({
  elements: { icon: true },
  elementModifiers: { icon: { loading: props.loading } },
}));
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :class="buttonClass"
    @click="emit('download')"
  >
    <span :class="iconClass" aria-hidden="true">{{ props.loading ? "…" : "↓" }}</span>
    {{ props.loading ? "Downloading" : "Download" }}
  </button>
</template>
```

## Styles and output

Create `button.css` alongside your chosen component:

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

While loading, the button receives `ui-button ui-button--disabled ui-button--loading` and the icon receives `ui-button__icon ui-button__icon--loading`. Icon classes belong on the inner `span`, separately from the outer button.

Classes control styles, native `disabled` prevents repeated clicks, and `aria-busy` signals work in progress. The parent manages download state and request logic. See the [classes() API](/en/api/#conditional-composition-with-classes) for exact field behavior.

## Shared configuration

Create one factory in `bem.ts`, then create a block for each component. This navigation example emits both the base element class and the current-item modifier:

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

The button above can import `bem` from this file and use `bem.block("button")` too. When changing the namespace or separators, update the matching CSS selectors. See [createBem configuration](/en/api/#createbemoptions) for all options.
