import { Pipe, PipeTransform } from '@angular/core';

import { ActionCategory } from '@models/campaign';

@Pipe({
  name: 'actionCategory'
})
export class ActionCategoryPipe implements PipeTransform {

  transform(value: ActionCategory): any {
    switch (value) {
      case ActionCategory.OLD:
        return 'Idosos';
      case ActionCategory.CHILDREN:
        return 'Crianças';
      case ActionCategory.ANIMALS:
        return 'Animais';
      case ActionCategory.PATIENTS:
        return 'Pessoas hospitalizadas';
      case ActionCategory.HOMELESS:
        return 'Pessoas em situação de rua';
      case ActionCategory.NONE:
        return 'Outras';
    }
  }

}
