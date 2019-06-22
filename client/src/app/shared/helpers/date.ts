import * as Moment from 'moment';

export function addDate(value: number, unit: Moment.unitOfTime.DurationConstructor, date?: Date | string) {
    return Moment(date).add(value, unit);
}