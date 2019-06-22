import { Pipe, PipeTransform } from '@angular/core';

import { ActionCategory } from '@models/campaign';

@Pipe({
  name: 'actionCategoryBackgroundColor'
})
export class ActionCategoryBackgroundColorPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case ActionCategory.OLD:
        return '#78909c';
      case ActionCategory.CHILDREN:
        return '#26c6da';
      case ActionCategory.ANIMALS:
        return '#66bb6a';
      case ActionCategory.PATIENTS:
        return '#f44336';
      case ActionCategory.HOMELESS:
        return '#8d6e63';
      case ActionCategory.NONE:
        return '#bdbdbd';
    }
  }

}
