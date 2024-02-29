import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { DetailedRecipeComponent } from './detailed-recipe/detailed-recipe.component';
import { SubmissionComponent } from './submission/submission.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: "", component: RecipesComponent },
  { path: "recipe/:id", component: DetailedRecipeComponent },
  { path: "addnew", component: SubmissionComponent },
  { path: "**", component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
