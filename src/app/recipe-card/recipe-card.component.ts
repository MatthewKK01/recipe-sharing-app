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
  @Input() CardWidth: string; // Bootstrap card width
  @Input() Link: boolean; // Navigate to detailedPage
}
