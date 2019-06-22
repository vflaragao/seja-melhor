import { Pipe, PipeTransform } from '@angular/core';

import { ActionCategory } from '@models/campaign';

@Pipe({
  name: 'actionCategoryColor'
})
export class ActionCategoryColorPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case ActionCategory.OLD:
        return 'white';
      case ActionCategory.CHILDREN:
        return 'white';
      case ActionCategory.ANIMALS:
        return 'white';
      case ActionCategory.PATIENTS:
        return 'white';
      case ActionCategory.HOMELESS:
        return 'white';
      case ActionCategory.NONE:
        return 'white';
    }
  }

}
