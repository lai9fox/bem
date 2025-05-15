class Bem {
  namespace: string;
  elementConcat: string;
  modifyConcat: string;
  blockName: string;

  constructor(namespace: string, elementConcat: string, modifyConcat: string) {
    this.namespace = namespace;
    this.elementConcat = elementConcat;
    this.modifyConcat = modifyConcat;
  }

  createBem(blockName: string): (em?: string | object | (string | object)[], modify?: string) => string | string[] {
    this.blockName = blockName;
    return this.bem.bind(this);
  }

  bem(em?: string | object | (string | object)[], modify?: string): string | string[] {
    if (Array.isArray(em)) return this.convertArray(em, modify);
    if (typeof em === 'object') return this.convertObject(em, modify);
    if (typeof em === 'string') return this.convertString(em, modify);
    return this.convertString('');
  }

  convertString(em: string, modify?: string): string {
    const [ele, innerModify] = em.split(':');
    const mod = innerModify || modify;
    return `${ this.namespace }${ this.blockName }${ ele ? this.elementConcat + ele : '' }${ mod ? this.modifyConcat + mod : '' }`;
  }

  convertObject(em: object, modify?: string): string[] {
    const converts: string[] = [];
    Object.entries(em).forEach(([key, val]) => {
      if (!val) return;
      converts.push(this.convertString(key, modify));
    });
    return converts;
  }

  convertArray(em: (string | object)[], modify?: string): string[] {
    const converts: string[] = [];
    em.forEach(eleM => {
      if (typeof eleM === 'string' && eleM) {
        converts.push(this.convertString(eleM, modify));
      } else if (typeof eleM === 'object') {
        converts.push(...this.convertObject(eleM, modify));
      }
    });
    return converts;
  }
}

export default function(config?: string | { namespace?: string, elementConcat?: string, modifyConcat?: string }): (blockName: string) => (em?: string | object | (string | object)[], modify?: string) => string | string[] {
  let n = '';
  let e = '__';
  let m = '--';

  if (typeof config === 'string') {
    n = config;
  } else if (typeof config === 'object') {
    const { namespace, elementConcat, modifyConcat } = config;
    if (namespace) n = namespace;
    if (elementConcat) e = elementConcat;
    if (modifyConcat) m = modifyConcat;
  }
  const b = new Bem(n, e, m);
  return b.createBem.bind(b);
}
