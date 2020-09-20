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
    let params = new HttpParams();
    params = params.set('id', id);
    
    return this.http$.get(`${environment.baseUrl}Branch`, {params: params});
  }

}