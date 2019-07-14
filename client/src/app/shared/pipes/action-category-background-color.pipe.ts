import { Pipe, PipeTransform } from '@angular/core';

import { ActionCategory } from '@models/campaign';

@Pipe({
  name: 'actionCategoryBackgroundColor'
})
export class ActionCategoryBackgroundColorPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case ActionCategory.OLD:
        return '#4db6ac';
      case ActionCategory.CHILDREN:
        return '#4fc3f7';
      case ActionCategory.ANIMALS:
        return '#81c784';
      case ActionCategory.PATIENTS:
        return '#e57373';
      case ActionCategory.HOMELESS:
        return '#ff8a65';
      case ActionCategory.NONE:
        return '#9575cd';
    }
  }

}
