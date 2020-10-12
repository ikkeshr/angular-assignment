import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.addIconToMatUI("notification", "../assets/icons/notifications-black-36dp.svg");
    this.addIconToMatUI("reorder", "../assets/icons/reorder-black-24dp.svg");
  }

  addIconToMatUI(iconName: string, iconUrl: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl)
    );
  }

}
