import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxDropzoneComponent } from 'ngx-dropzone';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input('max') maxImg: number = 3;

  files: File[] = [];

  // imgUrl: string = "../../../assets/imgs/profile-pic1.jpeg";
  @Input('preloadImgs') preloadImgsUrl: string[] = [];
  @Output('onUpload') emitter = new EventEmitter();

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, "Close", {
      duration: 3000,
      panelClass: 'snack-bar'
    });
  }

  ngOnChanges(changes: SimpleChange): void {
    // console.log(this.preloadImgsUrl);
    this.files = [];
    this.preloadImgsUrl.forEach(img => {
      this.imgUrlToFile(img);
    });
  }

  async imgUrlToFile(imgUrl: string): Promise<void> {
    const imgName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
    const response = await fetch(imgUrl); // param: url/location
    const blob = await response.blob();
    const file = new File([blob], imgName, {type: blob.type});
    // console.log(file);
    this.files.push(file);
  }

  onSelect(event) {
    // console.log(event);
    if (event.rejectedFiles.length > 0) {
      this.openSnackBar("Please select an Image");
      return;
    }
    if ( (this.files.length + event.addedFiles.length) > this.maxImg ) {
      this.openSnackBar("Cannot add more pictures");
      return;
    }
    this.files.push(...event.addedFiles);
    this.emitValues();
  }

  onRemove(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.emitValues();
  }
  
  emitValues(): void {
    const pictures = this.files.map(f => f.name);
    // console.log(pictures);
    this.emitter.emit(pictures);
  }

}
