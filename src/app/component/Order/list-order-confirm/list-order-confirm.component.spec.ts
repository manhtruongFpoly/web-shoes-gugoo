import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderConfirmComponent } from './list-order-confirm.component';

describe('ListOrderConfirmComponent', () => {
  let component: ListOrderConfirmComponent;
  let fixture: ComponentFixture<ListOrderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
