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

  getWaitingTickets(data) {
    let params = new HttpParams();
    params = params.set('statusIds', data.statusIds);
    params = params.set('pageSize', data.pageSize);

    return this.http$.get(`${environment.baseUrl}Ticket/VisitorDailyTickets`, {params: params});
  }

}