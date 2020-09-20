import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contentAnimation } from 'src/app/shared/animations/animations';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { VisitorTicketsService } from '../visitor-tickets.service';

@Component({
  selector: 'app-generate-ticket',
  templateUrl: './generate-ticket.component.html',
  styleUrls: ['./generate-ticket.component.scss'],
  animations: [
    contentAnimation
  ]
})
export class GenerateTicketComponent implements OnInit {
  generateForm: FormGroup = new FormGroup({
    branch: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required)
  });
  
  showBranchList = false;
  branches = [];

  showDepartmentsList = false;
  branchDetail = {};

  constructor(
    private _visitorTicketService: VisitorTicketsService,
    public _translationService: TranslationsService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this._visitorTicketService.getBranches()
    .subscribe(res => {
      this.branches = res['data'];
    });
  }

  openBranchList(input: HTMLElement, list?) {
    this.renderer.addClass(input, 'ng-dirty');
    this.renderer.setStyle(list, 'display', 'block');
    this.showBranchList = true;
  }
  closeBranchList(input: HTMLElement) {
    console.log(input);
    
    this.renderer.removeClass(input, 'ng-dirty');
    this.showBranchList = false;
  }
  
  onBranchSelect(ev) {
    const branchId = ev.target.value;

    this._visitorTicketService.getDepartmentsByBranchId(branchId)
    .subscribe(res => {
      console.log(res);

      this.branchDetail = res['data'][0];
    });
  }

  generateTicket() {
    console.log('scakmls');
  }

}
