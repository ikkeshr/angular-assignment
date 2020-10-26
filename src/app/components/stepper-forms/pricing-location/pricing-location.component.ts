import { ɵNullViewportScroller } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { UrlHandlingStrategy } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-pricing-location',
  templateUrl: './pricing-location.component.html',
  styleUrls: ['./pricing-location.component.scss']
})
export class PricingLocationComponent implements OnInit {

  @Input('eventData') eventData: any;
  @Input('stepper') stepper: MatStepper;
  @Output('form') emitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  pricingLocationForm: FormGroup;
  formSubmitted: boolean = false;
  venueHintDisplayState: boolean = false;
  paymentPanelOpenState: boolean = true;

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
  ) {}

  ngOnInit(): void {
    this.pricingLocationForm = this.formBuilder.group({
      location: this.formBuilder.group({
        city: '',
        venue: '',
        address: ''
      }, { validators: this.validateLocation }),
      payment: this.formBuilder.group ({
        type: ['Paid', Validators.required],
        pricing: this.formBuilder.array([this.createPricing()]),
        methods: this.formBuilder.array([])
      }, { validators: this.validatePayment })
    });
    this.emitter.emit(this.pricingLocationForm);
  }

  // Fill in form data for update
  ngOnChanges(): void {
    if (this.eventData) {
      // console.log(this.eventData);
      this.venueHintDisplayState = false;
      this.formSubmitted = false; // Remove validation errors, if any

      // Create pricings controls in form
      const pricingFormArray = (this.pricingLocationForm.get('payment').get('pricing') as FormArray);
      pricingFormArray.clear();
      this.eventData.payment.pricing.forEach(() => pricingFormArray.push(this.createPricing()));

      // Add payment methods to form
      (this.pricingLocationForm.get("payment").get("methods") as FormArray).clear();
      this.eventData.payment.methods.forEach(cardName => this.paymentMethodChecked(cardName));

      // Update payment type
      this.setPaymentType(this.eventData.payment.type);

      this.pricingLocationForm.patchValue({
        location: {
          city: this.eventData.location.City,
          venue: this.eventData.location.Venue,
          address: this.eventData.location.Address
        },
        payment: {
          // type: this.eventData.payment.type,
          pricing: this.eventData.payment.pricing,
          methods: this.eventData.payment.methods
        }
      });
    }

  }

  cityChange(change: MatSelectChange): void {
    this.pricingLocationForm.get('location').patchValue({ venue: '' });
    this.venueHintDisplayState = false;
  }

  getVenuesByCity(): string[] {
    const location =  this.locations.find(element => element.city === this.pricingLocationForm.get('location').value.city);
    if (location) return location.venues;
    return [];
  }

  showVenueHint(): void {
    if (this.getVenuesByCity().length < 1) this.venueHintDisplayState = true;
  }

  setPaymentType(paymentType): void {
    this.pricingLocationForm.get('payment').patchValue({ type: paymentType });
    if (paymentType === "Free") {
      this.paymentPanelOpenState = false;
      (this.pricingLocationForm.get("payment").get("pricing") as FormArray).clear();
    } else if (paymentType == "Paid") {
      this.paymentPanelOpenState = true;
    }
  }

  pricingCountChanged(pricingCount: number): void  {
    // console.log(this.pricingLocationForm.get('payment').get('pricing').value.length)
    const actualPricingCount: number = this.pricingLocationForm.get('payment').get('pricing').value.length;
    if (pricingCount > actualPricingCount) {
      (this.pricingLocationForm.get('payment').get('pricing') as FormArray).push(this.createPricing());
    }
    else if (pricingCount < actualPricingCount) {
      (this.pricingLocationForm.get('payment').get('pricing') as FormArray).removeAt(actualPricingCount-1);
    }
  }

  createPricing(): FormGroup {
    return this.formBuilder.group({
      ticket_name: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required]
    });
  }

  paymenyMethodPresent(cardName: string): boolean {
    const paymentMethodsFormArray: FormArray = this.pricingLocationForm.get("payment").get("methods") as FormArray;
    return ( paymentMethodsFormArray.value.findIndex(m => m === cardName) > -1 );
  }

  paymentMethodChecked(cardName: string): void {
    // console.log(cardName);
    const paymentMethodsFormArray: FormArray = this.pricingLocationForm.get("payment").get("methods") as FormArray;
    const alreadyExistIdx = paymentMethodsFormArray.value.findIndex(m => m === cardName);
    if (alreadyExistIdx < 0) {
      paymentMethodsFormArray.push(this.formBuilder.control(cardName));
    } else {
      paymentMethodsFormArray.removeAt(alreadyExistIdx);
    }
  }

  submit() {
    this.formSubmitted = true;
    console.log(this.pricingLocationForm);
    // console.log(this.pricingLocationForm.value);
    if (this.pricingLocationForm.valid) {
      this.emitter.emit(this.pricingLocationForm);
      this.stepper.next();
    }
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

  validatePayment: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const type: FormControl = form.get("type") as FormControl;
    const pricing: any[] = form.get("pricing").value;
    const methods: string[] = form.get("methods").value;

    if (type.invalid) {
      return { paymentTypeEmpty: true };
    }
    
    if (type.value === "Paid") {
      if (pricing.length < 1) {
        return { paymentPricingEmpty: true }; 
      }

      for (var i=0; i<pricing.length; i++) {
        const el = pricing[i];
        if ( el.ticket_name === "" || el.price === "" || el.currency === "" ) {
          return { pricingFieldEmpty: true };
        }
      }

      if (methods.length < 1) return { paymentMethodEmpty: true };
    }

    return null;

  }

}
