import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input('eventData') updateEvent: any;
  @Input('stepper') stepper: MatStepper;
  @Output('form') emitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  generalInfoForm: FormGroup; 
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.generalInfoForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      type: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      datetime: this.formBuilder.group({
        occurence: ['', Validators.required],
        occurence_date: ['', Validators.required],
        occurence_start_date: ['', Validators.required],
        occurence_end_date: ['', Validators.required],
        start_time: ['', Validators.required],
        end_time: ['', Validators.required]
      }),
      pictures: this.formBuilder.array([], [Validators.required, Validators.maxLength(3)])
    });
  }

  ngOnInit(): void {
    this.emitter.emit(this.generalInfoForm);
  }

  ngOnChanges(): void {
    if (this.updateEvent) {
      // console.log(this.updateEvent);

      this.generalInfoForm.patchValue({
        title:this.updateEvent.title,
        description: this.updateEvent.description,
      });
      this.setCategory(this.updateEvent);
      this.setType(this.updateEvent.type);
      this.setDate(this.updateEvent.datetime);
      this.setPictures(this.updateEvent.pictures);
    }
  }

  setCategory(event: any): void {
    this.generalInfoForm.patchValue({
      category: event.category,
      subcategory: event.subcategory
    });
  }

  setType(type: any): void {
    this.generalInfoForm.patchValue({type:type});
  }

  setDate(datetime: any): void {
    // console.log(datetime);
    this.generalInfoForm.patchValue({
      datetime: {
        occurence: datetime.occurence,
        occurence_date: datetime.occurence_date,
        occurence_start_date: datetime.occurence_start_date,
        occurence_end_date: datetime.occurence_end_date,
        start_time: datetime.start_time,
        end_time: datetime.end_time,
      }
    });
  }

  setPictures(pictures: string[]): void {
    (this.generalInfoForm.get("pictures") as FormArray).clear();
    pictures.forEach(picture => {
      (this.generalInfoForm.get("pictures") as FormArray).push(this.formBuilder.control(picture));
    });
  }

  submit(): void {
    this.formSubmitted = true;
    // console.log(this.generalInfoForm);

    if (this.generalInfoForm.valid) {
      console.log("emitting generalInfoForm...");
      this.emitter.emit(this.generalInfoForm);
      this.stepper.next();
    }
    // this.stepper.next();
  }

}
