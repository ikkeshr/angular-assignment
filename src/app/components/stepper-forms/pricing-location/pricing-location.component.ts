import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-pricing-location',
  templateUrl: './pricing-location.component.html',
  styleUrls: ['./pricing-location.component.scss']
})
export class PricingLocationComponent implements OnInit {

  @Input('eventData') eventData: any; 
  pricingLocationForm: FormGroup;
  formSubmitted: boolean = false;

  locations: any[] = [
    {
      city: "Curepipe",
      venues: ["Paradise Hall", "JC Auditorium", "Flamingo Hall"]
    },
    {
      city: "Port-Louis",
      venues: ["Domaine Du Pouce", "Water's Edge", "Royal Gardens"]
    },
    {
      city: "Quatre-Bornes",
      venues: ["Corpe de Garde", "Triveni"]
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pricingLocationForm = this.formBuilder.group({
      location: this.formBuilder.group({
        city: '',
        venue: '',
        address: ''
      }, { validators: this.validateLocation }),
      payment: this.formBuilder.group ({
        type: ['', Validators.required]
      })
    });
  }

  // Fill in form data for update
  ngOnChanges(): void {
    if (this.eventData) {
      console.log(this.eventData);
      this.formSubmitted = false; // Remove validation errors, if any

      this.pricingLocationForm.patchValue({
        location: {
          city: this.eventData.location.City,
          venue: this.eventData.location.Venue,
          address: this.eventData.location.Address
        },
        payment: {
          type: this.eventData.payment.type
        }
      });
    }
  }

  cityChange(change: MatSelectChange): void {
    this.pricingLocationForm.get('location').patchValue({ venue: '' });
  }

  getVenuesByCity(): string[] {
    const location =  this.locations.find(element => element.city === this.pricingLocationForm.get('location').value.city);
    if (location) return location.venues;
    return [];
  }

  setPaymentType(paymentType): void {
    this.pricingLocationForm.get('payment').patchValue({ type: paymentType });
  }

  test() {
    this.formSubmitted = true;
    console.log(this.pricingLocationForm);
  }

  // Cross field Validator
  validateLocation: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const city = form.get("city").value;
    const venue = form.get("venue").value;
    const address = form.get("address").value.trim();

    if (address === "" && city === "") {
      return { locationEmpty: true }
    }
    else if (address !== "" && city !== "") {
      return { conflict: true }
    }
    else if (address !== "" && city === "") {
      return null;
    }
    else if (address === "" && city !== "") {
      if (venue === "") {
        return { venueEmpty: true }
      } else {
        return null;
      }
    }


  }

}
