import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderShippingComponent } from './list-order-shipping.component';

describe('ListOrderShippingComponent', () => {
  let component: ListOrderShippingComponent;
  let fixture: ComponentFixture<ListOrderShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
