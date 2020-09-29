import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class VisitorTicketsService {

  constructor(private http$: HttpClient) {}

  getBranches() {
    return this.http$.get(`${environment.baseUrl}Branch`);
  }
  getDepartmentsByBranchId(id: string) {
    return this.http$.get(`${environment.baseUrl}Branch/${+id}`);
  }

  generateTicket(data: {branchId: number, departementId: number}) {
    return this.http$.post(`${environment.baseUrl}Ticket`, data);
  }

  getVisitorTickets(data) {
    let params = new HttpParams();
    params = params.set('statusIds', data.statusIds);
    params = params.set('pageSize', data.pageSize);
    // const date = new Date('9/26/2020').toDateString();
    // params = params.set('specificDay', date);

    return this.http$.get(`${environment.baseUrl}Ticket/VisitorDailyTickets`, {params: params});
  }

  getClosedTicketInfo(id: string) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http$.get(`${environment.baseUrl}Ticket/ClosedTicketInfo`, {params: params});
  }

}