import { Pipe, PipeTransform } from '@angular/core';

import { Account } from 'src/app/auth/auth.dto';

@Pipe({
  name: 'accountsType'
})
export class AccountsTypePipe implements PipeTransform {

  transform(value: Account[], institutional: boolean): any {
    return value.filter(account => account.institutional === institutional);
  }

}
