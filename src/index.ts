import { BlockBuilder } from './block.js';
import { assertName, normalizeOptions } from './validation.js';
import type { BemFactory, BemOptions } from './types.js';

export function createBem(options?: BemOptions): BemFactory {
  const resolvedOptions = normalizeOptions(options);

  return Object.freeze({
    block(name: string) {
      assertName(name, 'block');
      return Object.freeze(new BlockBuilder(resolvedOptions, name));
    },
  });
}

export type { BemBlock, BemFactory, BemOptions, ClassInput, Conditions } from './types.js';
