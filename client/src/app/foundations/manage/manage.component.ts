import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoundationsService } from '../foundations.service';
import { AccountService } from 'src/app/auth/account.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Account } from 'src/app/auth/auth.dto';
import { FoundationUpdateDTO } from '@models/foundation';
import { MatAutocompleteSelectedEvent, MatDialog, MatTable } from '@angular/material';
import { Product } from '@models/product';
import { ManageProductComponent } from '@dialogs/index';
import { Item, ItemUnit } from '@models/fields/item';
import { FormControl } from '@angular/forms';
import { ProductService } from '@core/product.service';
import { GoalCreateDTO } from '@models/goal';
import { Collaborator, Role, RoleValues } from '@models/fields/collaborator';
import { ActionCategory, ActionCategoryValues } from '@models/campaign';
import { ItemUnitValues } from '../../shared/models/fields/item';
import { UsersService } from 'src/app/users/users.service';

enum FoundationTab {
  REGISTER_DATA,
  USERS,
  GOAL
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void>;

  private userColumns: string[];
  private productColumns: string[];

  @ViewChild('goalTable', { static: false })
  private goalTable: MatTable<Item>;
  @ViewChild('userTable', { static: false })
  private userTable: MatTable<Item>;

  private isLoading: boolean;

  private logged: Account;
  private selectedTab: FoundationTab;

  private foundation: FoundationUpdateDTO;
  private categoryOptions: ActionCategory[];

  private defaultManager: Collaborator;
  private collaborator: Collaborator;
  private userRoles: Role[];
  private userControl: FormControl;
  private collaborators: Collaborator[];
  private users: Observable<Collaborator[]>;

  private item: Item;
  private goal: GoalCreateDTO;
  private itemUnits: ItemUnit[];
  private productControl: FormControl;
  private products: Observable<Product[]>;


  constructor(
    private readonly _dialog: MatDialog,
    private readonly _route: ActivatedRoute,
    private readonly _userService: UsersService,
    private readonly _productService: ProductService,
    private readonly _accountService: AccountService,
    private readonly _foundationService: FoundationsService
  ) {
    this.userColumns = ['name', 'email', 'role', 'actions'];
    this.productColumns = ['product', 'quantity', 'unit', 'actions'];
    this.selectedTab = FoundationTab.REGISTER_DATA;

    this._destroy$ = new Subject();

    this.foundation = new FoundationUpdateDTO();
    this.categoryOptions = ActionCategoryValues;

    this.collaborator = new Collaborator();
    this.userRoles = RoleValues;
    this.userControl = new FormControl();

    this.item = new Item();
    this.goal = new GoalCreateDTO();
    this.itemUnits = ItemUnitValues;
    this.productControl = new FormControl();
  }

  get validProduct() {
    if (!this.productControl.value) { return false; }
    const { _id } = this.productControl.value;
    return _id && this.item.quantity && this.item.unit;
  }

  get validCollaborator() {
    if (!this.userControl.value) { return false; }
    const { user } = this.userControl.value;
    return user && this.collaborator.role;
  }

  ngOnInit() {
    this._accountService.account
      .pipe(takeUntil(this._destroy$))
      .subscribe(account => {
        this.logged = account;
        this.fetchFoundation();
      });
    this.products = this.productControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => this._productService.list(value)),
        map(response => {
          if (response.length) {
            return response.filter(product => {
              const alreadyContains = this.goal.items
                .find(selected => selected.product === product._id);
              return !alreadyContains;
            });
          }
          return [{
            _id: null,
            name: 'Produto não encontrato. Desejo cadastrá-lo'
          }] as Product[];
        })
      );
    this.users = this.userControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(value => this._userService.listCollaborators(value)),
      );
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  /** Product functions */
  productLabel(payload?: Product): string | undefined {
    return payload && payload._id && payload.name;
  }

  onRemoveItem(value: Product) {
    const index = this.goal.items.findIndex(item => value._id === item.product);
    this.goal.items.splice(index, 1);
    this.goalTable.renderRows();
  }

  onInsertItem() {
    this.goal.items.push({ ...this.item });
    this.item = new Item();
    this.productControl.setValue('');
    this.goalTable.renderRows();
  }

  async onSelectProduct(evt: MatAutocompleteSelectedEvent) {
    const selectedOption = evt.option.value as Product;
    if (selectedOption._id) {
      this.item.product = selectedOption._id;
      this.item.name = selectedOption.name;
      this.item.type = selectedOption.type;
    } else {
      const dialogRef = this._dialog.open(ManageProductComponent);
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        try {
          await this._productService.save(result);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  /** User functions */
  userLabel(payload?: Collaborator): string | undefined {
    return payload && payload.user && payload.name;
  }

  async onRemoveCollaborator(value: Collaborator) {
    try {
      await this._foundationService.removeCollaborator(value);
      const index = this.collaborators.findIndex(col => value.user === col.user);
      this.collaborators.splice(index, 1);
      this.userTable.renderRows();
    } catch (e) {
      console.error(e);
    }
  }

  async onInsertCollaborator() {
    try {
      await this._foundationService.saveCollaborator(this.collaborator);
      const index = this.collaborators.findIndex(col => this.collaborator.user === col.user);
      if (index !== -1) {
        this.collaborators.splice(index, 1, { ...this.collaborator });
      } else {
        this.collaborators.push({ ...this.collaborator });
      }
      this.collaborator = new Collaborator();
      this.userControl.setValue('');
      this.userTable.renderRows();
    } catch (e) {
      console.error(e);
    }
  }

  async onSelectUser(evt: MatAutocompleteSelectedEvent) {
    const selectedOption = evt.option.value as Collaborator;
    if (selectedOption.user) {
      this.collaborator = selectedOption;
    }
  }

  private async fetchFoundation() {
    try {
      this.isLoading = true;
      this.foundation = await this._foundationService.get(this.logged._id);
      this.collaborators = await this._foundationService.listCollaborators();
      this.defaultManager = this.collaborators.find(col => col.email === this.logged.email);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
