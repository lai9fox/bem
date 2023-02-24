export function isEmptyString(param: any): boolean {
  return  typeof param === 'string' && !param;
}

export function isEmptyObject(param: any): boolean {
  return Object.prototype.toString.call(param) === '[object Object]' && !Object.keys(param).length;
}

/**
 * 构造一个 bem 生成器
 * @param namespace 生成器命名空间
 * @param options 生成器连接符，可选配置。`options.elementConcat` 为命名空间与元素的连接符，默认 `__`；`options.modifierConcat` 为命名空间或者元素与修饰符的连接符，默认 `--`
 * @returns Function
 */
export default function createBem(
    namespace: string,
    options = { elementConcat: '__', modifierConcat: '--'}
  ): (
    description?: string | object | (string | object)[],
    appendModifier?: string
  ) => string | object | (string | object)[] {

  if (typeof namespace !== 'string' || !namespace) {
    console.warn("A 'namespace' of type string is required");
    return () => '';
  }

  const { elementConcat, modifierConcat } = options;

  /** 解析字符串 */
  const resolveString = (str: string, appendModifier?: string): string => {

    let needEleConcat = false;
    let ele = '';
    let needModConcat = false;
    let mod = '';

      // 无修饰符，需判断是否有附加修饰符
    if (str.indexOf(':') === -1) {
      needEleConcat = true;
      needModConcat = !!appendModifier;
      ele = str;
      mod = appendModifier || mod;
    } else if (str.startsWith(':')) {
      // 只有修饰符，忽略附加修饰符
      needModConcat = true;
      mod = str.substring(1);
    } else {
      // 元素、修饰符共存，行内修饰符优先级高于附加修饰符
      const [ e, m ] = str.split(':');
      needEleConcat = true;
      needModConcat = true;
      ele = e;
      mod = m;
    }

    return `${namespace}${needEleConcat ? elementConcat + ele : ''}${needModConcat ? modifierConcat + mod : ''}`;
  }

  /** 解析对象 */
  const resolveObject = (obj: object, appendModifier?: string): object => {

    const ret = {};
    const keys = Object.keys(obj);

    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      const value = obj[key];
      ret[resolveString(key, appendModifier)] = value;
    }

    return ret;
  }

  /** 解析数组 */
  const resolveArray = (arr: (string | object)[], appendModifier?: string): (string | object)[] => {

    const ret = [];

    for (let i = 0, len = arr.length; i < len; i++) {
      const val = arr[i];
      // 跳过空字符串、空对象
      if (isEmptyString(val) || isEmptyObject(val)) {
        continue;
      }
      const valType = Object.prototype.toString.call(val).slice(8, -1);
      if (valType === 'String') {
        ret.push(resolveString(val as string, appendModifier));
      } else if (valType === 'Object') {
        ret.push(resolveObject(val as object, appendModifier));
      }
    }

    return ret;
  }

  return (
      description?: string | object | (string | object)[],
      appendModifier?: string
    ): string | object | (string | object)[] => {

    if (!description) {
      return namespace;
    }

    const descType = Object.prototype.toString.call(description).slice(8, -1);

    switch (descType) {
      case 'String':
        return resolveString(description as string, appendModifier);
      case 'Array':
        return resolveArray(description as Array<string | object>, appendModifier);
      case 'Object':
        return resolveObject(description as object, appendModifier);
      default:
        return namespace;
    }
  }
}
