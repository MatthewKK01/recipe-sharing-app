import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: "", component: RecipesComponent },
  { path: "recipe/:id", component: DetailedRecipeComponent },
  { path: "newrecipe", component: SubmissionComponent },
  { path: "edit/:id", component: SubmissionComponent },
  { path: "**", component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
