export namespace Database {
    export function search(properties: Array<string>, value: string) {
        const queryMatch = new RegExp(value, 'ig');
        const $or = properties.map(prop => ({ [prop]: queryMatch }));
        return { $or };
    }
}