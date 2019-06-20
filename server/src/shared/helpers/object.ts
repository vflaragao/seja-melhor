export namespace Objects {
    export function mergeArrayFromObject(obj: Array<any>, key: string, unifyItems?: boolean) {
        const mergedArr = obj.reduce((acc, cur) => {
            acc.push(...cur[key]);
            return acc;
        } , []);
        return unifyItems ? distinct(mergedArr) : mergedArr;
    }

    export function distinct(arr: Array<any>, key?: string[]) {
        return key ? distinctByKey(arr, key) : distinctByValue(arr);
    }

    const distinctByValue = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) === index);
    const distinctByKey = (arr: any[], key: string[]) => arr.filter((item, index) =>
        arr.findIndex(elmt => (key.filter(k => elmt[k] === item[k]).length === key.length)) === index);
}