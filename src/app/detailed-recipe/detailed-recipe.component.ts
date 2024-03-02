import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.scss']
})
export class DetailedRecipeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _recipe: RecipeService) { }
  myRecipe: Recipe | undefined

  ngOnInit(): void {
    //Borrow Id from query.
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      this._recipe.fetchDetailedRecipe(recipeId).subscribe(
        {
          next: res => this.myRecipe = res,
          error: err => console.log(err)
        }
      ); // Fetch Detailed Data
    });
  }
  deleteRecipe(id: string) {
    this._recipe.deleteRecipe(id).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }
  editRecipe(id: string) {
    console.log(id);
  }

}
