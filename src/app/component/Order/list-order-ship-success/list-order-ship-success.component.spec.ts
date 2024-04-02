import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderShipSuccessComponent } from './list-order-ship-success.component';

describe('ListOrderShipSuccessComponent', () => {
  let component: ListOrderShipSuccessComponent;
  let fixture: ComponentFixture<ListOrderShipSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderShipSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderShipSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
