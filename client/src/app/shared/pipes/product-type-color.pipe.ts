import { Pipe, PipeTransform } from '@angular/core';

import { ProductType } from '@models/product';

@Pipe({
  name: 'productTypeColor'
})
export class ProductTypeColorPipe implements PipeTransform {

  transform(value: ProductType): any {
    switch (value) {
      case ProductType.TOY:
        return '#66bb6a';
      case ProductType.FOOD:
        return '#8d6e63';
      case ProductType.REMEDY:
        return '#f44336';
      case ProductType.CLOTHE:
        return '#7e57c2';
      case ProductType.CLEANING_MATERIAL:
        return '#42a5f5';
    }
  }

}
