import * as moment from 'moment';

export namespace Dates {

    export function add(value: number, unit: moment.unitOfTime.DurationConstructor, date?: Date | string) {
        return moment(date).add(value, unit);
    }
}