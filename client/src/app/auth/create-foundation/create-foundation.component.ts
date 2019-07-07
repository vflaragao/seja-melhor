import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { FoundationCreateDTO } from '@models/foundation';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';

import { AuthService } from '../auth.service';
import { AddressService } from '@core/address.service';
import { FoundationsService } from 'src/app/foundations/foundations.service';

@Component({
  selector: 'app-create-foundation',
  templateUrl: './create-foundation.component.html',
  styleUrls: ['./create-foundation.component.scss']
})
export class CreateFoundationComponent implements OnInit, OnDestroy {

  private isLoading: boolean;
  private isLoadingAddress: boolean;

  private categoryOptions: ActionCategory[];

  private foundation: FoundationCreateDTO;

  private cep: Subject<void>;
  private _destroy$: Subject<void>;
  
  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private foundationService: FoundationsService
  ) {
    this.cep = new Subject();
    this._destroy$ = new Subject();

    this.foundation = new FoundationCreateDTO();
    this.categoryOptions = ActionCategoryValues;
  }

  ngOnInit() {
    this.cep.pipe(
      debounceTime(300),
      takeUntil(this._destroy$)
    )
    .subscribe(async () => {
      const { cep } = this.foundation.address;
      if (cep.length === 8) {
        try {
          this.isLoadingAddress = true;
          this.foundation.address = await this.addressService.getByCEP(cep);
        } catch (e) {
          console.error(e);
        } finally {
          this.isLoadingAddress = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  async onSave() {
    try {
      await this.foundationService.save(this.foundation);
      await this.authService.login(this.foundation.credentials);
    } catch (e) {
      console.error(e);
    }
  }
}
