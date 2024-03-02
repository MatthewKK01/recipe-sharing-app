import { Component, OnInit, } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';



@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private _recipe: RecipeService) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      ingredients: new FormArray([ // this is an array of ingredients
        new FormGroup( // an object for  each individual ingredient
          {
            name: new FormControl("", [Validators.required, Validators.minLength(2)]),
            quantity: new FormControl(null, [Validators.required, Validators.min(0.01)]),
            unit: new FormControl("", [Validators.required]),
          }
        )
      ]),
      instruction: new FormControl("", [Validators.required, Validators.minLength(10)]),
      image: new FormControl("", Validators.required),
    })
  }

  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Convert the image to a data URL
        const imageDataUrl = reader.result as string;

        // Save the data URL to your JSON server
        this.recipeForm.get('image').patchValue(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray // get ingredients from xpForm but in array state otherwise it has an error in ngFor loop when I want to get ingredients.controls
  }

  addIngredients() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl("", [Validators.required]),
        quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
        unit: new FormControl("", [Validators.required]),
      })
    )
  }



  onSubmit() {
    const newRecipe: Recipe = {
      title: this.recipeForm.get('title').value,
      description: this.recipeForm.get('description').value,
      image: this.recipeForm.get("image").value,
      ingredients: this.recipeForm.get('ingredients').value,
      instruction: this.recipeForm.get('instruction').value,
      isFavorited: false
    }
    this._recipe.addRecipe(newRecipe).subscribe({
      next: () => {
        this.recipeForm.reset()
        this.ingredients.removeAt(1)
      },
      error: err => console.log(err)
    })
  }
}
