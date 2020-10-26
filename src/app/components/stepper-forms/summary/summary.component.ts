import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input('eventData') eventData: any;

  @Input() generalInfoFormValues: any;
  @Input() pricingLocationFormValues: any;
  @Input() additionalInfoFormValues: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    // console.log(this.generalInfoFormValues);
  }

}
