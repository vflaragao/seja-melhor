import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '@models/product';

@Pipe({
  name: 'productTypeIcon'
})
export class ProductTypeIconPipe implements PipeTransform {

  transform(value: ProductType): any {
    switch (value) {
      case ProductType.TOY:
        return 'videogame_asset';
      case ProductType.FOOD:
        return 'restaurant';
      case ProductType.REMEDY:
        return 'local_hospital';
      case ProductType.CLOTHE:
        return 'business_center';
    }
  }

}
