import { Component, OnInit } from '@angular/core';

import { ProductType, ProductTypeValues } from '@models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private filterEntity: string;
  private filterProduct: ProductType;

  private productTypes: ProductType[];

  constructor() {
    this.productTypes = ProductTypeValues;
  }

  ngOnInit() {
  }

}
