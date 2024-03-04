import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  searchText: string = ""
  filter: string = 'all'; // Default filter is 'all'

  constructor(private _recipe: RecipeService) { }
  clearInput() {
    this.searchText = ""
  }
  ngOnInit(): void {
    this._recipe.getRecipes().subscribe({
      next: data => this.recipes = data,
      error: err => console.log(err)
    })
  }

  get filteredRecipes(): Recipe[] {
    if (this.filter === 'favorites') {
      return this.recipes.filter(recipe => recipe.isFavorited === true);
    }
    return this.recipes;
  }
}
