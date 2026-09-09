---
title: 快速上手
description: 用 @lai9fox/bem 创建带图标的按钮，添加样式，并根据禁用状态更新类名。
locale: zh
---

BEM 将类名分为三部分：

- **block（块）**：组件本身，如 `button`。
- **element（元素）**：组件的组成部分，如 `button__icon`。
- **modifier（修饰符）**：组件或元素的变体、状态，如 `button--disabled`。

## 安装

```bash
npm i @lai9fox/bem
```

## 创建按钮和图标

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

node.append(icon, "下载");
document.body.append(node);
```

生成的 HTML 如下：

```html
<button type="button" class="ui-button">
  <span class="ui-button__icon" aria-hidden="true">↓</span>
  下载
</button>
```

`namespace` 设置类名前缀。这里的 `ui-` 包含末尾的 `-`；省略该选项时，按钮类名为 `button`。

## 添加 CSS

将以下 CSS 添加到项目已加载的样式表中：

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

## 根据状态更新类名

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

`block: true` 添加基础类 `ui-button`。`disabled` 为 `true` 时，再添加 `ui-button--disabled`。类名用于设置样式，实际禁用按钮需要设置 `node.disabled`。

## 下一步

- [示例](/examples/)：在组件中使用。
- [共用命名配置](/examples/#共用命名配置)：统一类名前缀和连接符。
- [API 参考](/api/)：查看方法、类型和配置。
