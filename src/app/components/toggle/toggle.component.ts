import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input('leftText') leftText: string;
  @Input('rightText') rightText: string;
  @Output('onChange') emitter = new EventEmitter<string>();

  @Input('select') selectedValue: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(value: string): void {
    this.selectedValue = value;
    this.emitValueSelected();
  }

  emitValueSelected(): void {
    this.emitter.emit(this.selectedValue);
  }

}
