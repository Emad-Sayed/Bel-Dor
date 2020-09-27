import { Component, OnInit } from '@angular/core';
import { contentAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    contentAnimation
  ]
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
