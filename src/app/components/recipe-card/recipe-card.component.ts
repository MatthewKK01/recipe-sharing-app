import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';




@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() detailedRecipe: Recipe; // take data from parent child which should be rendered 

  toggleFavorite(): void {
    this.detailedRecipe.isFavorited = !this.detailedRecipe.isFavorited;
  }
}
