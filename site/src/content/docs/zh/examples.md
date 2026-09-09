---
title: React 与 Vue 示例
description: 根据下载状态更新按钮和图标的类名，并在多个组件间共用命名配置。
locale: zh
---

示例适用于 React + TypeScript 或 Vue 3.3+ 项目。[安装 @lai9fox/bem](/guide/) 后，选择对应框架的组件，并添加下方的 `button.css`。

## React：下载按钮

保存为 `DownloadButton.tsx`。父组件通过 `onDownload` 处理下载，下载期间传入 `loading={true}`。类名生成器在组件外创建，渲染时根据 props 生成类名。

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

保存为 `DownloadButton.vue`。父组件通过 `:loading="loading"` 传入状态，通过 `@download="startDownload"` 处理下载。`computed` 在相关 props 变化时更新类名。

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
    {{ props.loading ? "下载中" : "下载" }}
  </button>
</template>
```

## 配套样式与输出

在组件所在目录创建 `button.css`：

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

下载期间，类名如下：

- 按钮：`ui-button ui-button--disabled ui-button--loading`。
- 图标 `span`：`ui-button__icon ui-button__icon--loading`。

`disabled` 属性禁用按钮，`aria-busy` 标记忙碌状态，类名用于设置样式。下载状态和请求由父组件管理。条件组合规则见 [classes() API](/api/#条件组合-classes)。

## 共用命名配置

在 `bem.ts` 中创建工厂，供各组件导入并调用 `bem.block(name)`。下面以导航项为例，为当前项添加修饰类：

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

按钮组件也可以导入这个 `bem`，调用 `bem.block("button")`。修改类名前缀或连接符时，需同步更新 CSS 选择器。配置选项见 [createBem](/api/#createbemoptions)。
