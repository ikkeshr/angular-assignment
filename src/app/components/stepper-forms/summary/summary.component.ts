import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Image } from '../../../helpers/image';

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

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.generalInfoFormValues) {
    //   console.log(this.generalInfoFormValues.pictures);

    //   let generalFormImgsUrl: any[] = [];
    //   let fileReader: FileReader = new FileReader();
    //   fileReader.onload = () => { 
    //     generalFormImgsUrl.push(fileReader.result)
    //   };
    //   this.generalInfoFormValues.pictures.forEach(p => {
    //     fileReader.readAsDataURL(p); //Error here
    //   });
    // }
    // console.log(changes);

  }

  getCurrencyCode(currency: string): string {
    if (currency === "Indian Rupees") {
      return "INR";
    } else if (currency === "Mauritian Rupees") {
      return "MUR";
    } else if (currency === "US Dollar") {
      return "USD";
    } else if (currency === "Euro") {
      return "EUR";
    }
  }

}
