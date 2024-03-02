import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './models/recipe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(recipes: Recipe[], filterItems: string): Recipe[] {
    if (!recipes || !filterItems) {
      return recipes;
    }
    filterItems = filterItems.toLowerCase();
    return recipes.filter(recipe => {
      // Check if the title contains the search text
      const titleMatch = recipe.title.toLowerCase().includes(filterItems);
      // Check if any ingredient contains the search text
      const ingredientMatch = recipe.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(filterItems)
      );
      return titleMatch || ingredientMatch;
    });
  }

}
