import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointQRCodeComponent } from './collection-point-qrcode.component';

describe('CollectionPointQRCodeComponent', () => {
  let component: CollectionPointQRCodeComponent;
  let fixture: ComponentFixture<CollectionPointQRCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPointQRCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointQRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
