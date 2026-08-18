---
title: API 参考
description: createBem、BemBlock 方法与校验规则。
locale: zh
---

## createBem(options?)

创建 BEM 工厂，返回冻结的 `BemFactory`。

| 选项                | 类型     | 默认   | 说明                              |
| ------------------- | -------- | ------ | --------------------------------- |
| `namespace`         | `string` | `''`   | 类名前缀；可为空，不可含空白      |
| `elementSeparator`  | `string` | `'__'` | element 连接符；非空，不可含空白  |
| `modifierSeparator` | `string` | `'--'` | modifier 连接符；非空，不可含空白 |

```ts
const bem = createBem({ namespace: "acme-" });
const button = bem.block("button");
```

## bem.block(name)

为指定 block 创建生成器（`BemBlock`）。`name` 须为非空、无空白的字符串。

## BemBlock 方法

| 方法                                   | 返回                                    |
| -------------------------------------- | --------------------------------------- |
| `block()`                              | `namespace + block`                     |
| `element(name)`                        | block 类 + element 连接符 + name        |
| `modifier(name)`                       | block 类 + modifier 连接符 + name       |
| `elementModifier(element, modifier)`   | element 类 + modifier 连接符 + modifier |
| `elements(names)`                      | 多个 element，空格连接                  |
| `modifiers(names)`                     | 多个 modifier，空格连接                 |
| `elementModifiers(element, modifiers)` | 同一 element 的多个 modifier            |
| `classes(input)`                       | 按条件混合输出                          |

批量方法对名称稳定去重。

### classes(input)

```ts
interface ClassInput {
  block?: unknown;
  elements?: Record<string, unknown>;
  modifiers?: Record<string, unknown>;
  elementModifiers?: Record<string, Record<string, unknown>>;
}
```

- truthy 输出，falsy 忽略
- 不隐式补充父类
- `elements` / `modifiers` / `elementModifiers` 须为非 `null`、非数组对象

## 校验规则

- block、element、modifier：非空，无空白
- `namespace`：可为 `''`，不可含空白
- 连接符：非空，无空白
- 结构错误抛出 `TypeError`

库按原样拼接，不解析结果；名称中可以包含连接符字符。

## 导出类型

`BemOptions` · `BemFactory` · `BemBlock` · `ClassInput` · `Conditions`
