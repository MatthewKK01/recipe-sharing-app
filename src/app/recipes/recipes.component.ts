import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[];
  constructor(private _recipe: RecipeService) { }

  ngOnInit(): void {
    this._recipe.getRecipes().subscribe({
      next: data => this.recipes = data,
      error: err => console.log(err)
    })
  }
}
