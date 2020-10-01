import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class EmployeeService {

  constructor(private http$: HttpClient) { }

  getEmployeeDailyTickets(data) {
    let params = new HttpParams();
    params = params.set('statusIds', data.statusIds);
    params = params.set('pageSize', data.pageSize);
    
    return this.http$.get(`${environment.baseUrl}Ticket/EmployeeDailyTickets`, {params: params});
  }
  
  serveTicket() {
    return this.http$.post(`${environment.baseUrl}Ticket/ServeTicket`, null);
  }
  closeServedTicket() {
    return this.http$.post(`${environment.baseUrl}Ticket/CloseServedTicket`, null);
  }
}