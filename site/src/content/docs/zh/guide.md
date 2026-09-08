---
title: BEM 快速上手
description: 安装 @lai9fox/bem，使用 TypeScript 创建带图标的按钮，将 BEM 类名连接到 DOM、CSS 和禁用状态。
locale: zh
---

本教程使用浏览器 DOM API 完成一个按钮，适用于已有的 TypeScript 前端项目。BEM 中，block 表示组件（`button`），element 表示内部元素（`button__icon`），modifier 表示变化或状态（`button--disabled`）。

## 安装

```bash
npm i @lai9fox/bem
```

## 创建按钮和图标

将下面代码放入项目的浏览器入口文件，在页面 DOM 加载后执行：

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

生成的结构如下。按钮与图标各自使用对应的类名：

```html
<button type="button" class="ui-button">
  <span class="ui-button__icon" aria-hidden="true">↓</span>
  下载
</button>
```

`namespace: "ui-"` 是直接添加的前缀，包括末尾的 `-`。省略配置时，按钮类名为 `button`。

## 添加 CSS

将这些规则放入项目已加载的样式表。类名生成器只返回字符串，样式仍由 CSS 定义：

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

接在前面的 TypeScript 代码后，为按钮添加状态更新函数：

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

`block: true` 保留基础样式，`disabled` 决定是否添加修饰类。原生 `disabled` 属性负责禁用交互，类名负责外观；仅添加修饰类不会禁用按钮。

## 下一步

- 在 React 或 Vue 中使用：[完整组件示例](/examples/)。
- 统一项目的命名规则：[共用命名配置](/examples/#共用命名配置)。
- 查询连接符、批量方法和条件行为：[API 参考](/api/)。
