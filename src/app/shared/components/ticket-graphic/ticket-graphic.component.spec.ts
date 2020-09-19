import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGraphicComponent } from './ticket-graphic.component';

describe('TicketGraphicComponent', () => {
  let component: TicketGraphicComponent;
  let fixture: ComponentFixture<TicketGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
