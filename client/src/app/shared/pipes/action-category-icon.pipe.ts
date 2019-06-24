import { Pipe, PipeTransform } from '@angular/core';

import { ActionCategory } from '@models/campaign';

@Pipe({
  name: 'actionCategoryIcon'
})
export class ActionCategoryIconPipe implements PipeTransform {

  transform(value: ActionCategory): any {
    switch (value) {
      case ActionCategory.OLD:
        return 'group';
      case ActionCategory.CHILDREN:
        return 'child_care';
      case ActionCategory.ANIMALS:
        return 'pets';
      case ActionCategory.PATIENTS:
        return 'local_hospital';
      case ActionCategory.HOMELESS:
        return 'location_city';
      case ActionCategory.NONE:
        return 'cloud';
    }
  }

}
