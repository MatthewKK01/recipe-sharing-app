import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>("http://localhost:3000/recipes")
  }
  addRecipe(recipe: Recipe) {
    return this.http.post("http://localhost:3000/recipes", recipe)
  }
  fetchDetailedRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:3000/recipes/${id}`);
  }
  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/recipes/${id}`)
  }
  updateRecipe(id: string, changedRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`http://localhost:3000/recipes/${id}`, changedRecipe)
  }
}
