import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';



@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() detailedRecipe: Recipe; // For Information

  toggleFavorite(): void {
    this.detailedRecipe.isFavorited = !this.detailedRecipe.isFavorited;
  }
}
