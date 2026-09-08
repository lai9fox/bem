---
title: React 与 Vue BEM 组件示例
description: 使用 @lai9fox/bem 实现 React、Vue 下载按钮，分别处理按钮和图标的状态类名，并共用项目命名配置。
locale: zh
---

这些示例面向已有的 React TypeScript 或 Vue 3.3+ 项目。先[安装 @lai9fox/bem](/guide/)，按所用框架选择一个组件，再添加下方共用的 `button.css`。基础 DOM 与 CSS 的关系见[快速上手](/guide/)。

## React：下载按钮

保存为 `DownloadButton.tsx`。父组件提供 `onDownload` 回调，并在下载期间传入 `loading={true}`。生成器放在组件外，渲染时只根据 props 计算类名。

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
      {loading ? "下载中" : "下载"}
    </button>
  );
}
```

## Vue：响应式下载状态

保存为 `DownloadButton.vue`。父组件通过 `:loading="loading"` 传入状态，通过 `@download="startDownload"` 处理事件。使用 `computed`，让 props 改变时重新生成类名。

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
    {{ props.loading ? "下载中" : "下载" }}
  </button>
</template>
```

## 配套样式与输出

在所选组件旁创建 `button.css`：

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

加载时，按钮得到 `ui-button ui-button--disabled ui-button--loading`，图标得到 `ui-button__icon ui-button__icon--loading`。图标类名放在内部 `span` 上，不混入外层按钮。

类名只负责样式，原生 `disabled` 阻止重复点击，`aria-busy` 表示正在处理。下载状态和请求逻辑由父组件管理。各字段的精确行为见 [classes() API](/api/#条件组合-classes)。

## 共用命名配置

在 `bem.ts` 中创建一次工厂，每个组件再创建自己的 block。下面的导航示例为导航项同时输出基础类和当前项修饰类：

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

上面的按钮也可以从此文件导入 `bem`，然后使用 `bem.block("button")`。更改命名空间或连接符时，需同步调整对应 CSS 选择器；完整选项见 [createBem 配置](/api/#createbemoptions)。
