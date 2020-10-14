import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-category-input',
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.scss']
})
export class CategoryInputComponent implements OnInit {

  categories: any[] = [
    {
      category: "Music",
      mat_logo: "music_note",
      subcategories: ["Alternative Music", "Blues", "Classical Music", "Country Music", "Dance Music",
                        "Electronic Music", "Hip Hop / RAP", "Latin Music", "Jazz", "Opera", "POP"]
    },
    {
      category: "Food & Drink",
      mat_logo: "local_cafe",
      subcategories: ["Breads", "Cereals", "Rice", "Pasta", "Noodles", "Vegetables", "Fruits"]
    },
    {
      category: "Art & Culture",
      mat_logo: "create",
      subcategories: ["Painting", "Architecture", "Sculpture", "Literature", "Music", "Performing", "Cinema"]
    },
    {
      category: "Parties & Nightlife",
      mat_logo: "album",
      subcategories: ["Tea Party", "Costume Party", "Halloween Party", "Christmas Party"]
    },
    {
      category: "Sports & Wellness",
      mat_logo: "directions_bike",
      subcategories: ["Games", "Athletics", "Gymnastics", "Swimming", "Outdoors"]
    },
    {
      category: "Networking & Classes",
      mat_logo: "laptop",
      subcategories: ["Business", "Management", "Accounting", "Administration", "Information & Technology"]
    }
  ]

  @Input('category') selectedCategory: string = "";
  @Input('subcategory') selectedSubCategory: string = "";
  @Output('values') emitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedSubCategory = "";
    this.emitSelectedValues();
  }

  getSelectedCategorySubs(): any {
    return this.categories.filter(obj => obj.category === this.selectedCategory).pop();
  }

  selectSubCategory(subcategory: string): void {
    this.selectedSubCategory = subcategory;
    this.emitSelectedValues();
  }

  emitSelectedValues() {
    this.emitter.emit({
      category: this.selectedCategory,
      subcategory: this.selectedSubCategory
    });
  }

}
