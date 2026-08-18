import type { ResolvedBemOptions } from './types.js';

export function formatClass(
  options: ResolvedBemOptions,
  block: string,
  element?: string,
  modifier?: string,
): string {
  const elementSuffix = element === undefined ? '' : options.elementSeparator + element;
  const modifierSuffix = modifier === undefined ? '' : options.modifierSeparator + modifier;
  return `${ options.namespace }${ block }${ elementSuffix }${ modifierSuffix }`;
}
