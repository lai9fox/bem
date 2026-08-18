import type { BemOptions, ClassInput, Conditions, ResolvedBemOptions } from './types.js';

const whitespacePattern = /\s/u;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertString(value: unknown, label: string, allowEmpty = false): asserts value is string {
  if (typeof value !== 'string' || (!allowEmpty && value.length === 0) || whitespacePattern.test(value)) {
    throw new TypeError(
      `${ label } must be ${ allowEmpty ? 'a string' : 'a non-empty string' } without whitespace`,
    );
  }
}

function defaultWhenUndefined(value: unknown, fallback: string): unknown {
  return value === undefined ? fallback : value;
}

export function assertName(value: unknown, label: string): asserts value is string {
  assertString(value, label);
}

export function assertNameList(value: unknown, label: string): asserts value is readonly string[] {
  if (!Array.isArray(value)) {
    throw new TypeError(`${ label } must be an array`);
  }

  value.forEach((name) => assertName(name, label));
}

export function assertConditionRecord(value: unknown, label: string): asserts value is Conditions {
  if (!isRecord(value)) {
    throw new TypeError(`${ label } must be a non-null, non-array object`);
  }
}

export function assertClassInput(value: unknown): asserts value is ClassInput {
  assertConditionRecord(value, 'classes input');

  if (value.elements !== undefined) assertConditionRecord(value.elements, 'elements');
  if (value.modifiers !== undefined) assertConditionRecord(value.modifiers, 'modifiers');

  const elementModifiers = value.elementModifiers;
  if (elementModifiers !== undefined) {
    assertConditionRecord(elementModifiers, 'elementModifiers');
    Object.keys(elementModifiers).forEach((element) => {
      assertConditionRecord(elementModifiers[element], `elementModifiers.${ element }`);
    });
  }
}

export function normalizeOptions(options?: BemOptions): ResolvedBemOptions {
  if (options !== undefined && !isRecord(options)) {
    throw new TypeError('options must be an object');
  }

  const namespace = defaultWhenUndefined(options?.namespace, '');
  const elementSeparator = defaultWhenUndefined(options?.elementSeparator, '__');
  const modifierSeparator = defaultWhenUndefined(options?.modifierSeparator, '--');

  assertString(namespace, 'namespace', true);
  assertString(elementSeparator, 'elementSeparator');
  assertString(modifierSeparator, 'modifierSeparator');

  return Object.freeze({ namespace, elementSeparator, modifierSeparator });
}
