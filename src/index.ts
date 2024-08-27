function init() {

	/**
	 * 连接元素的符号
	 */
	let e = '__';

	/**
	 * 连接描述的符号
	 */
	let m = '--';

	/**
	 * 设置连接符
	 */
	function setConcat({ elementConcat, modifyConcat }) {
		e = elementConcat || e;
		m = modifyConcat || m;
	}

	/**
	 * 转换字符串
	 */
	function convertString(ns: string, em: string, modify?: string): string {
		const [ele, innerModify] = em.split(':');
		const mod = innerModify || modify;
		return `${ns}${ele ? e + ele : ''}${mod ? m + mod : ''}`;
	}

	/**
	 * 转换对象
	 */
	function convertObject(ns: string, em: object, modify?: string): string[] {
		const converts = [];
		Object.entries(em).forEach(([key, val]) => {
			if (!val) return;
			converts.push(convertString(ns, key, modify));
		});
		return converts;
	}

	/**
	 * 转换数组
	 */
	function convertArray(ns: string, em: (string | object)[], modify?: string): string[] {
		const converts = [];
		em.forEach(eleM => {
			if (typeof eleM === 'string') {
				eleM && converts.push(convertString(ns, eleM, modify));
			} else if (Object.prototype.toString.call(eleM) === '[object Object]') {
				converts.push(...convertObject(ns, eleM, modify));
			}
		})
		return converts;
	}

	/**
	 * 输入命名空间，返回 bem 构造器
	 * @param namespace
	 */
	function createBem(namespace?: string) {
		if (typeof namespace !== "string") throw new Error("A 'namespace' of type string is required");
		return function bem(em?: string | (string | object)[] | object, modify?: string): string | string[] {
			if (Array.isArray(em)) {
				return convertArray(namespace, em, modify);
			} else if (Object.prototype.toString.call(em) === '[object Object]') {
				return convertObject(namespace, em as object, modify);
			} else if (typeof em === 'string') {
				return convertString(namespace, em, modify);
			} else {
				return convertString(namespace, '');
			}
		}
	}

	createBem.setConcat = setConcat;

	return createBem;
}

export default init();
