import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { contentAnimation } from 'src/app/shared/animations/animations';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
import { NotificationService } from 'src/app/shared/services/notification.service';
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
  @ViewChild(SpinnerDirective, {static: true, read: SpinnerDirective}) spinnerPlaceholder: SpinnerDirective;
  
  generateForm: FormGroup = new FormGroup({
    branch: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required)
  });
  
  showBranchList = false;
  branches = [];

  showDepartmentsList = false;
  branchDetail: any = {};
  selectedDep: any;

  constructor(
    private _visitorTicketService: VisitorTicketsService,
    public _translationService: TranslationsService,
    private _notificationService: NotificationService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.spinnerPlaceholder.sendViewContainer();

    this._visitorTicketService.getBranches()
    .subscribe(res => {
      this.branches = res['data'];
    });
  }

  openListSelect(input: HTMLElement, list?) {
    this.renderer.addClass(input, 'ng-dirty');
    this.renderer.setStyle(list, 'display', 'block');
    this.spinnerPlaceholder.sendViewContainer();
  }
  closeBranchList(list: HTMLElement) {
    this.renderer.removeStyle(list, 'display');
  }
  
  onBranchSelect(ev) {
    const branchId = ev.target.value;

    this._visitorTicketService.getDepartmentsByBranchId(branchId)
    .subscribe(res => {
      console.log(res);

      this.branchDetail = res['data'][0];

      this.generateForm.get('branch').setValue(
        this._translationService.isEnglish
          ? this.branchDetail.branchEN
          : this.branchDetail.branchAR
      );

      if (this.generateForm.get('department').value) {
        this.generateForm.get('department').reset();
      }
    });
  }

  onDepSelect(id) {
    console.log(id);
    this.selectedDep = this.branchDetail['departements'].find(dep => dep.departementId == id);

    this.generateForm.get('department').setValue(
      this._translationService.isEnglish
        ? this.selectedDep.departementNameEN
        : this.selectedDep.departementNameAR
    );
  }

  generateTicket() {
    if(this.generateForm.valid) {
      const data = {
        branchId: this.branchDetail['branchId'],
        departementId: this.selectedDep['departementId']
      };
  
      this._visitorTicketService.generateTicket(data)
      .subscribe(res => {
        if (this._translationService.isEnglish) {
          this._notificationService
          .showSuccess(`Your ticket number <mark>${res['data'][0]['ticketNumber']}</mark> <a class="e-link" href="/tickets" rel="noopener">Check it out.</a>`, 'Ticket generated successfully!');
        } else {
          this._notificationService
          .showSuccess(`تذكرتك رقم <mark>${res['data'][0]['ticketNumber']}</mark> <a class="e-link" href="/tickets" rel="noopener">تفقدها من هنا</a>`, 'تم استخراج تذكره بنجاح');
        }
      },
      err => {
        const errorMessage = this._translationService.isEnglish? err.error.error_EN: err.error.error_AR;

        if (this._translationService.isEnglish) {
        this._notificationService.showError(`${errorMessage} <br> Your current active ticket number is <mark>${err['error']['data'][0]['ticketNumber']}</mark> <a class="e-link" href="/tickets" rel="noopener">Check it out.</a>`);
        } else {
          this._notificationService.showError(`${errorMessage} <br> تذكرتك الحاليه رقم <mark>${err['error']['data'][0]['ticketNumber']}</mark> <a class="e-link" href="/tickets" rel="noopener">تفقدها من هنا</a>`);
        }
      });
    }
  }

}
