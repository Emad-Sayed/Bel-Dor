import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class EmployeeService {

  constructor(private http$: HttpClient) { }

  getEmployeeDailyTickets(data) {
    return this.http$.get(`${environment.baseUrl}Ticket/EmployeeDailyTickets`, {params: data});
  }
  
  serveTicket() {
    return this.http$.post(`${environment.baseUrl}Ticket/ServeTicket`, null);
  }
  closeServedTicket() {
    return this.http$.post(`${environment.baseUrl}Ticket/CloseServedTicket`, null);
  }
  setTicketAsMissed() {
    return this.http$.post(`${environment.baseUrl}Ticket/SetTicketAsMissed`, null);
  }
  serveMissedTicket(id: string) {
    return this.http$.post(`${environment.baseUrl}Ticket/ServeMissedTicket?ticketId=${id}`, null);
  }
}