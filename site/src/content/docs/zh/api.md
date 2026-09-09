---
title: API 参考
description: "@lai9fox/bem 的方法、类型、配置和校验规则。"
locale: zh
---

初次使用可先阅读[快速上手](/guide/)，或查看 [示例](/examples/)。

## createBem(options?)

`createBem(options?: BemOptions): BemFactory` 创建工厂对象，再通过 `bem.block(name)` 创建组件的类名生成器 `BemBlock`。两者均由 `Object.freeze()` 冻结。生成类名的方法均返回 `string`。

| 选项                | 类型     | 默认值 | 说明                                   |
| ------------------- | -------- | ------ | -------------------------------------- |
| `namespace`         | `string` | `''`   | 类名前缀，可为空字符串，不可含空白字符 |
| `elementSeparator`  | `string` | `'__'` | 元素连接符，非空且不含空白字符         |
| `modifierSeparator` | `string` | `'--'` | 修饰符连接符，非空且不含空白字符       |

省略选项或传入 `undefined` 时使用默认值，传入 `null` 会抛出 `TypeError`。`namespace` 不会自动补连接符：前缀 `ui-` 生成 `ui-button`，前缀 `ui` 生成 `uibutton`。

## 单个类名

创建按钮的类名生成器：

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.block(); // 'ui-button'
button.element("icon"); // 'ui-button__icon'
button.modifier("disabled"); // 'ui-button--disabled'
button.elementModifier("icon", "active"); // 'ui-button__icon--active'
```

`modifier()` 和 `elementModifier()` 只返回修饰类。需要同时添加基础类时，使用下方的 `classes()`。

## 批量生成

批量方法接受 `readonly string[]`，按输入顺序生成类名，以单个空格（U+0020）连接。重复类名只保留第一次出现的结果，空数组返回 `''`。

```ts
button.elements(["icon", "label", "icon"]);
// 'ui-button__icon ui-button__label'

button.modifiers(["disabled", "loading"]);
// 'ui-button--disabled ui-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'ui-button__icon--active ui-button__icon--loading'

button.elements([]); // ''
```

为不同 DOM 节点分别设置类名时，应逐个调用 `element(name)`。

## 条件组合 classes()

`classes(input: ClassInput): string` 根据条件组合类名：

```ts
button.classes({
  block: true,
  modifiers: { disabled: true, loading: false },
});
// 'ui-button ui-button--disabled'

button.classes({
  elements: { icon: true },
  elementModifiers: { icon: { active: true } },
});
// 'ui-button__icon ui-button__icon--active'

button.classes({ modifiers: { disabled: true } });
// 'ui-button--disabled'

button.classes({}); // ''
```

- 条件按 JavaScript 的真假值规则判断，为真时添加类名。例如，`true`、非空字符串（包括 `'false'`）和对象为真；`false`、`0`、`''`、`null`、`undefined` 和 `NaN` 为假。
- 输出顺序固定为 `block` → `elements` → `modifiers` → `elementModifiers`，与字段的书写顺序无关。
- 条件对象按 `Object.keys()` 的顺序遍历：只处理自身可枚举的字符串键，整数索引键按数值升序排列。
- 重复类名只保留第一次出现的结果，各类名以单个空格连接。
- 基础类需要单独指定，例如 `block: true` 或 `elements: { icon: true }`。添加修饰类时不会自动添加基础类。

## 校验与错误

输入不符合以下要求时，会抛出 `TypeError`：

| 输入                                          | 要求                                       |
| --------------------------------------------- | ------------------------------------------ |
| `options`                                     | 省略、`undefined`，或非 `null`、非数组对象 |
| block / element / modifier 名称               | 非空且不含空白字符的字符串                 |
| 批量方法的名称参数                            | 数组，每个名称均符合上述规则               |
| `classes(input)` 的 `input`                   | 非 `null`、非数组对象                      |
| `elements` / `modifiers` / `elementModifiers` | 省略、`undefined`，或非 `null`、非数组对象 |
| 每个 `elementModifiers` 条目                  | 非 `null`、非数组对象                      |

`classes()` 只校验条件为真时使用的名称，但始终检查上述对象结构。`elementModifiers(element, [])` 返回空字符串，仍会校验 `element` 名称。

名称和连接符会原样拼接。名称可以包含连接符，因此不同输入可能生成相同类名。库不处理 CSS 转义；名称包含 CSS 特殊字符时，需要自行转义选择器。

## 导出类型

使用 `import type { … } from "@lai9fox/bem"` 导入以下类型：

```ts
interface BemOptions {
  namespace?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
}

type Conditions = Readonly<Record<string, unknown>>;

interface ClassInput {
  block?: unknown;
  elements?: Conditions;
  modifiers?: Conditions;
  elementModifiers?: Readonly<Record<string, Conditions>>;
}

interface BemFactory {
  block(name: string): BemBlock;
}

interface BemBlock {
  block(): string;
  element(name: string): string;
  modifier(name: string): string;
  elementModifier(element: string, modifier: string): string;
  elements(names: readonly string[]): string;
  modifiers(names: readonly string[]): string;
  elementModifiers(element: string, modifiers: readonly string[]): string;
  classes(input: ClassInput): string;
}
```

多个组件可以复用同一个工厂，见[共用命名配置](/examples/#共用命名配置)。
