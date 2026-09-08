[English](./README-EN.md) · [文档站点](https://bem.fox9.dev/)

# TypeScript BEM 类名生成器

`@lai9fox/bem` 用显式方法生成 block、element 和 modifier 类名。提供 TypeScript 类型声明，返回可直接用于 `class` / `className` 的字符串，不依赖 UI 框架。

## 安装

```bash
npm i @lai9fox/bem
```

## 快速体验

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.classes({ block: true, modifiers: { disabled: true } });
// 'ui-button ui-button--disabled'

button.element("icon");
// 'ui-button__icon'
```

第一组类名用于按钮，第二组用于按钮内部的图标。样式和 DOM 由应用定义。

## 文档

- [快速上手](https://bem.fox9.dev/guide/)：完成一个按钮，连接类名、DOM 与 CSS。
- [API 参考](https://bem.fox9.dev/api/)：全部方法、默认配置、批量生成、条件组合与校验规则。
- [React / Vue 示例](https://bem.fox9.dev/examples/)：完整组件与项目共用命名配置。

## 许可证

[MIT](./LICENSE)
