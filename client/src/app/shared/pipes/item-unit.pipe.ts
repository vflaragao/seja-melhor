import { Pipe, PipeTransform } from '@angular/core';
import { ItemUnit } from '@models/fields/item';

@Pipe({
  name: 'itemUnit'
})
export class ItemUnitPipe implements PipeTransform {

  transform(value: ItemUnit): any {
    switch (value) {
      case ItemUnit.UNIT:
        return 'unidade(s)';
      case ItemUnit.WEIGHT:
        return 'kg(s)';
    }
  }
}
