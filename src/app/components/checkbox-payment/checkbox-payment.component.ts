import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-payment',
  templateUrl: './checkbox-payment.component.html',
  styleUrls: ['./checkbox-payment.component.scss']
})
export class CheckboxPaymentComponent implements OnInit {

  @Input('cardImgSrc') imgSrc: string;
  @Input('name') name: string;
  @Output('onChecked') emmitter = new EventEmitter();
  @Input('checked') checked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCheck(): void {
    this.checked = !this.checked;
    this.emmitter.emit(this.name);
  }

}
