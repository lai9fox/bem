import { assembleClasses, joinClassNames } from './assemble.js';
import { formatClass } from './format.js';
import { assertName, assertNameList } from './validation.js';
import type { BemBlock, ClassInput, ResolvedBemOptions } from './types.js';

export class BlockBuilder implements BemBlock {
  constructor(
    private readonly options: ResolvedBemOptions,
    private readonly name: string,
  ) {}

  block(): string {
    return formatClass(this.options, this.name);
  }

  element(name: string): string {
    assertName(name, 'element');
    return formatClass(this.options, this.name, name);
  }

  modifier(name: string): string {
    assertName(name, 'modifier');
    return formatClass(this.options, this.name, undefined, name);
  }

  elementModifier(element: string, modifier: string): string {
    assertName(element, 'element');
    assertName(modifier, 'modifier');
    return formatClass(this.options, this.name, element, modifier);
  }

  elements(names: readonly string[]): string {
    assertNameList(names, 'elements');
    return joinClassNames(names.map((name) => formatClass(this.options, this.name, name)));
  }

  modifiers(names: readonly string[]): string {
    assertNameList(names, 'modifiers');
    return joinClassNames(names.map((name) => formatClass(this.options, this.name, undefined, name)));
  }

  elementModifiers(element: string, modifiers: readonly string[]): string {
    assertName(element, 'element');
    assertNameList(modifiers, 'modifiers');
    return joinClassNames(
      modifiers.map((modifier) => formatClass(this.options, this.name, element, modifier)),
    );
  }

  classes(input: ClassInput): string {
    return assembleClasses(this.options, this.name, input);
  }
}
