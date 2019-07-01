import { Pipe, PipeTransform } from '@angular/core';

import { ProductType } from '@models/product';

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {

  transform(value: ProductType): any {
    switch (value) {
      case ProductType.TOY:
        return 'Brinquedo';
      case ProductType.FOOD:
        return 'Alimento';
      case ProductType.REMEDY:
        return 'Remédio';
      case ProductType.CLOTHE:
        return 'Roupa';
      case ProductType.CLEANING_MATERIAL:
        return 'Material de limpeza';
    }
  }

}
