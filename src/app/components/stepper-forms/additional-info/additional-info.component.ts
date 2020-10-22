import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {

  @Input('eventData') eventData: any;

  additionalInfoForm: FormGroup;
  formSubmitted: boolean = false;

  openMatExapandPanel: boolean = true;

  restrictions: string[] = ["None", "Children Only", "Women Only", "No Children", "Event 18 +", "Senior Citizen"];

  constructor(
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log("ngInit " + this.openMatExapandPanel);
    this.initForm();
  }

  initForm(): void {
    this.additionalInfoForm = this.formBuilder.group({
      restrictions: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
      attendance_count: 0,
      special_guests: this.formBuilder.group({
        names: this.formBuilder.array([]),
        pictures: this.formBuilder.array([]),
        additional_info: ''
      })
    });
  }

  ngOnChanges(): void {
    if (this.eventData) {
      console.log(this.eventData);

      // Fill in restrictions data in form
      const restrictionFormArray = this.additionalInfoForm.get("restrictions") as FormArray;
      restrictionFormArray.clear();
      this.eventData.restrictions.forEach(r => {
        restrictionFormArray.push(this.formBuilder.control(r));
      });

      //Fill in special guest names data in form
      const specialGuestsNameFormArray = this.additionalInfoForm.get('special_guests').get('names') as FormArray;
      specialGuestsNameFormArray.clear();
      this.eventData.special_guests.names.forEach(sg => {
        specialGuestsNameFormArray.push(this.formBuilder.control(sg, Validators.required));
      });

      // Open panel to show guest names if any
      this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
      // this.cdRef.detectChanges();

      // Fill in special guests pictures in form
      const specialGuestsPicturesFormArray = this.additionalInfoForm.get('special_guests').get('pictures') as FormArray;
      specialGuestsPicturesFormArray.clear();
      this.eventData.special_guests.pictures.forEach(p => {
        specialGuestsPicturesFormArray.push(this.formBuilder.control(p));
      });

    }
    console.log("ng changes " + this.openMatExapandPanel);
    
  }

  ngAfterViewInit(): void {
    this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
    // this.cdRef.detectChanges();
    console.log("ngafter: " + this.openMatExapandPanel);
  }


  restrictionAdded(restriction): boolean {
    return this.additionalInfoForm.get('restrictions').value.find(r => r===restriction);
  }

  AddOrRemoveRestriction(restriction): void {
    const restrictionFormArray = this.additionalInfoForm.get("restrictions") as FormArray;
    const restrictionAlreadyAddedIdx = restrictionFormArray.value.findIndex(r => r===restriction);
    if (restrictionAlreadyAddedIdx < 0) {
      restrictionFormArray.push(this.formBuilder.control(restriction));
    } else {
      restrictionFormArray.removeAt(restrictionAlreadyAddedIdx);
    }
  }

  changeAttendanceCount(count: number): void {
    this.additionalInfoForm.get('attendance_count').patchValue(count);
  }

  changeSpecialGuestChange(count: number): void {
    const specialGuestsNameFormArray = this.additionalInfoForm.get('special_guests').get('names') as FormArray; 
    const actualSpecialGuestCount: number = specialGuestsNameFormArray.value.length;
    
    if (count < actualSpecialGuestCount) {
      specialGuestsNameFormArray.removeAt(actualSpecialGuestCount-1);
    }
    else if (count > actualSpecialGuestCount) {
      specialGuestsNameFormArray.push(this.formBuilder.control("", Validators.required));
    }

    this.openMatExapandPanel = this.additionalInfoForm.get('special_guests').get('names').value.length > 0;
  }

  submit(): void {
    this.formSubmitted = true;
    console.log(this.additionalInfoForm);
  }

}
