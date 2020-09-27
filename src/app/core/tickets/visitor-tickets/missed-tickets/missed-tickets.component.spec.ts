import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedTicketsComponent } from './missed-tickets.component';

describe('MissedTicketsComponent', () => {
  let component: MissedTicketsComponent;
  let fixture: ComponentFixture<MissedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
