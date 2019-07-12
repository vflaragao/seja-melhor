import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): any {
    const partials = value.split(' ');
    return `${partials[0]} ${partials.pop()}`;
  }
}
