import { Component, OnInit, Inject } from '@angular/core';

import { Product, ProductType, ProductTypeValues } from '@models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {

  private types: ProductType[];

  constructor(
    private dialogRef: MatDialogRef<ManageProductComponent>,
    @Inject(MAT_DIALOG_DATA) private product: Product,
  ) {
    this.types = ProductTypeValues;
    this.product = product || new Product();
  }

  get action() {
    return this.product._id ? 'Editar' : 'Cadastrar';
  }

  onAction() {
    this.dialogRef.close(this.product);
  }
}
