import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderCancelComponent } from './list-order-cancel.component';

describe('ListOrderCancelComponent', () => {
  let component: ListOrderCancelComponent;
  let fixture: ComponentFixture<ListOrderCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderCancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrderCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
