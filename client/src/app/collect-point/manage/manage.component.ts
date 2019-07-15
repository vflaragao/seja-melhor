import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollectPointCreateDTO } from '@models/collect-point';
import { AddressService } from '@core/address.service';
import { CollectPointService } from '../collect-point.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ActivityCollection } from '@models/fields/activity';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  private isLoading: boolean;
  private isLoadingAddress: boolean;

  private cep: Subject<void>;
  private _destroy$: Subject<void>;

  private collectPoint: CollectPointCreateDTO;

  constructor(
    private _route: ActivatedRoute,
    private _addressService: AddressService,
    private _collectPointService: CollectPointService,
  ) {
    this.cep = new Subject();
    this._destroy$ = new Subject();

    this.collectPoint = new CollectPointCreateDTO();
  }

  get action() {
    return this.collectPoint._id ? 'Editar' : 'Cadastrar';
  }

  ngOnInit() {
    this._route.queryParamMap
      .pipe(takeUntil(this._destroy$))
      .subscribe(params => {
        const target = params.get('t');
        const targetSource = params.get('ts');
        this.collectPoint.target = target;
        this.collectPoint.targetSource = targetSource as ActivityCollection;
      });
    this.cep
      .pipe(takeUntil(this._destroy$))
      .subscribe(async () => {
        const { cep } = this.collectPoint.address;
        if (cep.length === 8) {
          try {
            this.isLoadingAddress = true;
            this.collectPoint.address = await this._addressService.getByCEP(cep);
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

}
