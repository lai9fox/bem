const getVarType = Object.prototype.toString;

enum VarType {
	String = '[object String]',
	Object = '[object Object]',
	Array = '[object Array]',
}

const defaultBemConfig = { elementConcat: '__', modifierConcat: '--' };

export type BemConfig = typeof defaultBemConfig;

export type EleSet = string | object | (string | object)[];

export default function defineBem(prefix?: string, config?: Partial<BemConfig>) {

	const _prefix = prefix ? prefix + '-' : '';
	const _config = Object.assign({}, defaultBemConfig, config || {});

	return (namespace: string) => {

		if (typeof namespace !== 'string') {
			throw new Error("A 'namespace' of type string is required");
		}

		const resolveString = (strEle: string, appendModifier?: string) => {
			const { elementConcat, modifierConcat} = _config;

			let ele = '';
			let mod: string;

			if (strEle === '') {
				mod = appendModifier ? `${modifierConcat}${appendModifier}` : '';
			} else if (strEle.startsWith(':')) {
				mod = `${modifierConcat}${strEle.substring(1)}`;
			} else {
				const [e, m] = strEle.split(':');
				ele = `${elementConcat}${e}`;
				const comboModifier = m || appendModifier;
				mod = comboModifier ? `${modifierConcat}${comboModifier}` : '';
			}

			return `${_prefix}${namespace}${ele}${mod}`;
		}

		const resolveObject = (objEle: object, appendModifier?: string) => {
			const entries = Object.entries(objEle);
			const bemClasses: string[] = [];
			for (let i = 0; i < entries.length; i++) {
				const [key, value] = entries[i];
				if (!value) {
					continue;
				}
				bemClasses.push(resolveString(key, appendModifier));
			}
			return bemClasses;
		}

		const resolveArray = (arrEle: (string | object)[], appendModifier?: string) => {
			const bemClasses: string[] = [];
			for (const ele of arrEle) {
				if (getVarType.call(ele) === VarType.Object) {
					bemClasses.push(...resolveObject(ele as object, appendModifier));
				} else {
					ele && bemClasses.push(resolveString(ele as string, appendModifier));
				}
			}
			return bemClasses;
		}

		return (eleSet?: EleSet, appendModifier?: string) => {
			switch (getVarType.call(eleSet)) {
				case VarType.String:
					return resolveString(eleSet as string, appendModifier);
				case VarType.Object:
					return resolveObject(eleSet as object, appendModifier);
				case VarType.Array:
					return resolveArray(eleSet as (string | object)[], appendModifier);
				default: {
					const mod = appendModifier ? `${_config.modifierConcat}${appendModifier}` : '';
					return `${_prefix}${namespace}${mod}`;
				}
			}
		}
	};
}