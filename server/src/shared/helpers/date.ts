import * as moment from 'moment';

export namespace Dates {

    export function add(value: number, unit: moment.unitOfTime.DurationConstructor, date?: Date | string) {
        return moment(date).add(value, unit);
    }

    export function period(date: Date | string, unit: moment.unitOfTime.StartOf) {
        const init = moment(date).startOf(unit);
        const end = moment(date).endOf(unit);
        return { init, end };
    }
}