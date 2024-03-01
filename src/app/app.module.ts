import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesComponent } from './recipes/recipes.component';
import { SubmissionComponent } from './submission/submission.component';
import { DetailedRecipeComponent } from './detailed-recipe/detailed-recipe.component';
import { ErrorComponent } from './error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { BackButtonComponent } from './back-button/back-button.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SubmissionComponent,
    DetailedRecipeComponent,
    ErrorComponent,
    RecipeCardComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
