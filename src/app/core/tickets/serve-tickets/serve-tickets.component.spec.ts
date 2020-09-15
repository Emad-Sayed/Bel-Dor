import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeTicketsComponent } from './serve-tickets.component';

describe('ServeTicketsComponent', () => {
  let component: ServeTicketsComponent;
  let fixture: ComponentFixture<ServeTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
