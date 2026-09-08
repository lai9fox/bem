---
title: BEM TypeScript API 参考
description: 查阅 createBem、BemBlock 的完整类型、默认配置、批量生成、classes() 输出顺序、去重及 TypeError 校验规则。
locale: zh
---

本页集中定义 `@lai9fox/bem` 的公开接口与行为。第一次使用请先阅读[快速上手](/guide/)；组件集成见 [React / Vue 示例](/examples/)。

## createBem(options?)

签名为 `createBem(options?: BemOptions): BemFactory`。返回冻结的工厂；`bem.block(name)` 返回冻结的 `BemBlock`。所有类名生成方法返回 `string`。

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `namespace` | `string` | `''` | 原样添加的前缀，可为空，不可含空白 |
| `elementSeparator` | `string` | `'__'` | element 连接符，非空且不含空白 |
| `modifierSeparator` | `string` | `'--'` | modifier 连接符，非空且不含空白 |

省略选项或传入 `undefined` 时使用默认值。`null` 不表示使用默认值。`namespace` 不会自动补连接符，例如 `ui-` 与 `ui` 是不同的前缀。

## 单个类名

以下示例使用同一个生成器：

```ts
import { createBem } from "@lai9fox/bem";

const button = createBem({ namespace: "ui-" }).block("button");

button.block(); // 'ui-button'
button.element("icon"); // 'ui-button__icon'
button.modifier("disabled"); // 'ui-button--disabled'
button.elementModifier("icon", "active"); // 'ui-button__icon--active'
```

`modifier()` 与 `elementModifier()` 各返回一个修饰类，不自动附带 block 或 element 基础类。

## 批量生成

接着使用上面的 `button`。批量方法接受 `readonly string[]`，按输入顺序输出，以单个 ASCII 空格连接，稳定去重并保留首次出现的位置。空数组返回 `''`。

```ts
button.elements(["icon", "label", "icon"]);
// 'ui-button__icon ui-button__label'

button.modifiers(["disabled", "loading"]);
// 'ui-button--disabled ui-button--loading'

button.elementModifiers("icon", ["active", "loading"]);
// 'ui-button__icon--active ui-button__icon--loading'

button.elements([]); // ''
```

`elements()` 返回多个 element 类的字符串，不负责创建或分配 DOM 元素。为不同节点分别设置类名时，使用 `element(name)`。

## 条件组合 classes()

`classes(input: ClassInput): string` 按条件生成一个类名字符串。继续使用上面的 `button`：

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

- 条件使用 JavaScript truthiness：`true`、非空字符串（包括 `'false'`）、非零数字和对象会输出；`false`、`0`、`''`、`null`、`undefined`、`NaN` 不输出。
- 输出顺序固定为 `block` → `elements` → `modifiers` → `elementModifiers`，与这四个字段的声明顺序无关。
- 每个条件对象按 JavaScript 自有可枚举字符串属性顺序遍历（`Object.keys`）；整数索引键会按数值顺序排列。
- 完整类名在组合后稳定去重，保留首次出现的位置。
- 不隐式补父类。需要基础样式时，显式设置 `block: true` 或 `elements: { icon: true }`。

## 校验与错误

结构或名称不合法时抛出 `TypeError`：

| 输入 | 要求 |
| --- | --- |
| `options` | 省略、`undefined`，或非 `null`、非数组对象 |
| block / element / modifier 名称 | 非空且不含空白的字符串 |
| 批量名称 | 数组，其中的名称均满足名称规则 |
| `classes(input)` 的 `input` | 非 `null`、非数组对象 |
| `elements` / `modifiers` / `elementModifiers` | 省略、`undefined`，或非 `null`、非数组对象 |
| 每个 `elementModifiers` 条目 | 非 `null`、非数组对象 |

`classes()` 只校验实际输出的名称；falsy 条件对应的名称不参与校验，但上述对象结构仍会校验。`elementModifiers(element, [])` 虽返回空字符串，仍要求 element 名称合法。

名称和连接符原样拼接，不做解析、清洗或 CSS 转义。名称中允许出现连接符；不同输入结构可能生成相同类名。若名称包含 CSS 特殊字符，选择器需由应用正确转义。

## 导出类型

以下五个类型均可通过 `import type { … } from "@lai9fox/bem"` 导入：

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

共享工厂的项目结构见[共用命名配置](/examples/#共用命名配置)。
