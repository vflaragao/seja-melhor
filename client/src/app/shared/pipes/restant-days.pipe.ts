import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'restantDays'
})
export class RestantDaysPipe implements PipeTransform {

  transform(value: Date): any {
    if (value) {
      value = typeof value === 'string' && new Date(value) || value;
      const now = new Date();
      const diff = value.getDate() - now.getDate();
      if (diff >= 1) {
        return `restam ${diff} dia${(diff > 1 && 's')||''}`;
      } else if (diff === 0) {
        return `válido até hoje`
      } else {
        return 'vencido';
      }
    }
    return null;
  }

}
