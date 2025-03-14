import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryWithPoints } from '../shared/categories';
import { getCategoryClass } from '../shared/categories';


@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css']
})
export class CategorySelectorComponent {
  @Input() teams: any[] = []; // Zespoły
  @Input() categories: CategoryWithPoints[] = []; // Kategorie dostępne do wyboru
  @Output() categorySelected = new EventEmitter<CategoryWithPoints[]>();

  selectedCategories: CategoryWithPoints[] = []; // Lista wybranych kategorii

  toggleCategory(category: CategoryWithPoints) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  // Metoda do rozpoczęcia gry z wybranymi kategoriami
  startGame() {
    this.categorySelected.emit(this.selectedCategories);
  }

  getCategoryClass(category: CategoryWithPoints) {
    return getCategoryClass(category);
  }

}
