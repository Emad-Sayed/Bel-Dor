import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { QueueComponent } from '../components/queue/queue.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeTicketsRoutingModule } from './empoyee-tickets-routing.module';

@NgModule({
  declarations: [QueueComponent],
  imports: [
    SharedModule,
    EmployeeTicketsRoutingModule
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeTicketsModule { }
