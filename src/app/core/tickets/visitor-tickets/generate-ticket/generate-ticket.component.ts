import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contentAnimation } from 'src/app/shared/animations/animations';
import { SpinnerDirective } from 'src/app/shared/components/spinner/directive/spinner.directive';
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
  @ViewChild(SpinnerDirective) spinnerPlaceholder: SpinnerDirective;
  
  generateForm: FormGroup = new FormGroup({
    branch: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required)
  });
  
  showBranchList = false;
  branches = [];

  showDepartmentsList = false;
  branchDetail = {};
  selectedDep: {};

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
    });
  }

  onDepSelect(id) {
    console.log(id);
    this.selectedDep = this.branchDetail['departements'].find(dep => dep.id == id);

    console.log(this.selectedDep);
  }

  generateTicket() {
    console.log('scakmls');
  }

}
