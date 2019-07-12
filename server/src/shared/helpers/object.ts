type ObjClass<T> = new () => T;

// tslint:disable-next-line:no-namespace
export namespace Objects {
    export function mergeArrayFromObject(obj: any[], key: string, unifyItems?: boolean) {
        const mergedArr = obj.reduce((acc, cur) => {
            acc.push(...cur[key]);
            return acc;
        } , []);
        return unifyItems ? distinct(mergedArr) : mergedArr;
    }

    export function distinct(arr: any[], key?: string[]) {
        return key ? distinctByKey(arr, key) : distinctByValue(arr);
    }

    export function instance<T>(value: T, Clazz: ObjClass<T>) {
        const instanceObj = new Clazz();
        for (const attr in value) {
            if (value.hasOwnProperty(attr)) {
                instanceObj[attr] = value[attr];
            }
        }
        return instanceObj;
    }

    const distinctByValue = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) === index);
    const distinctByKey = (arr: any[], key: string[]) => arr.filter((item, index) =>
        arr.findIndex(elmt => (key.filter(k => elmt[k] === item[k]).length === key.length)) === index);
}
