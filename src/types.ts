export interface BemOptions {
  namespace?: string;
  elementSeparator?: string;
  modifierSeparator?: string;
}

export type Conditions = Readonly<Record<string, unknown>>;

export interface ClassInput {
  block?: unknown;
  elements?: Conditions;
  modifiers?: Conditions;
  elementModifiers?: Readonly<Record<string, Conditions>>;
}

export interface BemBlock {
  block(): string;
  element(name: string): string;
  modifier(name: string): string;
  elementModifier(element: string, modifier: string): string;
  elements(names: readonly string[]): string;
  modifiers(names: readonly string[]): string;
  elementModifiers(element: string, modifiers: readonly string[]): string;
  classes(input: ClassInput): string;
}

export interface BemFactory {
  block(name: string): BemBlock;
}

export interface ResolvedBemOptions {
  namespace: string;
  elementSeparator: string;
  modifierSeparator: string;
}
