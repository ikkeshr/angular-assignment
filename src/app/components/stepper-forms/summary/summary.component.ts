import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

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
    // console.log(changes);
    // console.log(this.pricingLocationFormValues);
    // if (this.eventData) {
    //   //Test Data
    //   console.log(this.eventData);
    //   this.generalInfoFormValues = {
    //     category: this.eventData.category,
    //     subcategory: this.eventData.subcategory,
    //     type: this.eventData.type,
    //     title: this.eventData.title,
    //     description: this.eventData.description,
    //     datetime: {
    //       occurence: this.eventData.datetime.occurence,
    //       occurence_date: this.eventData.datetime.occurence_date,
    //       occurence_start_date: this.eventData.datetime.occurence_start_date,
    //       occurence_end_date: this.eventData.datetime.occurence_end_date,
    //       start_time: this.eventData.datetime.start_time,
    //       end_time: this.eventData.datetime.end_time
    //     },
    //     pictures: this.eventData.pictures
    //   }

    //   this.pricingLocationFormValues = {
    //     location: {
    //       city: this.eventData.location.City,
    //       venue: this.eventData.location.Venue,
    //       address: this.eventData.location.Address
    //     },
    //     payment: {
    //       type: this.eventData.payment.type,
    //       pricings: this.eventData.payment.pricing,
    //       methods: this.eventData.payment.methods
    //     }
    //   }

    //   this.additionalInfoFormValues = {
    //     restrictions: this.eventData.restrictions,
    //     attendance_count: this.eventData.attendance_count,
    //     special_guests: this.eventData.special_guests,
    //     authorities_notified: this.eventData.authorities_notified
    //   }
    // }

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
