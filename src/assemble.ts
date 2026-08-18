import { formatClass } from './format.js';
import { assertClassInput, assertName } from './validation.js';
import type { ClassInput, Conditions, ResolvedBemOptions } from './types.js';

export function joinClassNames(names: Iterable<string>): string {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const name of names) {
    if (!seen.has(name)) {
      seen.add(name);
      result.push(name);
    }
  }

  return result.join(' ');
}

function appendTruthyNames(
  result: string[],
  conditions: Conditions,
  append: (name: string) => string,
  label: string,
): void {
  Object.keys(conditions).forEach((name) => {
    if (conditions[name]) {
      assertName(name, label);
      result.push(append(name));
    }
  });
}

export function assembleClasses(
  options: ResolvedBemOptions,
  block: string,
  input: ClassInput,
): string {
  assertClassInput(input);
  const result: string[] = [];

  if (input.block) result.push(formatClass(options, block));

  if (input.elements !== undefined) {
    appendTruthyNames(
      result,
      input.elements,
      (element) => formatClass(options, block, element),
      'element',
    );
  }

  if (input.modifiers !== undefined) {
    appendTruthyNames(
      result,
      input.modifiers,
      (modifier) => formatClass(options, block, undefined, modifier),
      'modifier',
    );
  }

  const elementModifiers = input.elementModifiers;
  if (elementModifiers !== undefined) {
    Object.keys(elementModifiers).forEach((element) => {
      const modifiers = elementModifiers[element];

      appendTruthyNames(
        result,
        modifiers,
        (modifier) => {
          assertName(element, 'element');
          return formatClass(options, block, element, modifier);
        },
        'modifier',
      );
    });
  }

  return joinClassNames(result);
}
