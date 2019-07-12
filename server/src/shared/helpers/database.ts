// tslint:disable-next-line:no-namespace
export namespace Database {
    export function search(properties: string[], value: string) {
        const queryMatch = new RegExp(value, 'ig');
        const $or = properties.map(prop => ({ [prop]: queryMatch }));
        return { $or };
    }
}
