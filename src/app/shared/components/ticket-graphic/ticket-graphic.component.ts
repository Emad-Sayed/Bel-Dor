import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-graphic',
  templateUrl: './ticket-graphic.component.html',
  styleUrls: ['./ticket-graphic.component.scss']
})
export class TicketGraphicComponent implements OnInit {

  @Input() ticketNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

}
