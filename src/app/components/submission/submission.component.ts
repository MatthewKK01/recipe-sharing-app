import { Component, OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  isNewRecipe = true;
  recipeForm: FormGroup | undefined;
  id: string;
  myImage: null;
  constructor(private _recipe: RecipeService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.route.url.subscribe({
      next: urlSegments => {
        const currentUrl = urlSegments.map(segment => segment.path).join('/'); // take an URL
        if (currentUrl === "newrecipe") {
          this.isNewRecipe = true; // if I am in newrecipe endpoint I will be able to post data
        } else {
          this.isNewRecipe = false;
          // If I am in editRecipe page I will be able to edit this data that took from state
        }
      }
    })
    if (this.isNewRecipe) {
      return null;
    } else {

      //take and id from query
      this.route.params.subscribe(params => {
        this.id = params['id'];

        this._recipe.fetchDetailedRecipe(this.id).subscribe(
          {
            next: (res) => {
              console.log(res);
              // Patch ingredients separately
              const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
              ingredientsArray.clear(); // Clear existing values if any
              // Set the ingretients array data from server
              res.ingredients.forEach(ingredient => {
                ingredientsArray.push(new FormGroup({
                  name: new FormControl(ingredient.name),
                  quantity: new FormControl(ingredient.quantity),
                  unit: new FormControl(ingredient.unit)
                }));
              });
              // Set other data to my reactive form
              this.recipeForm.patchValue({
                title: res.title,
                description: res.description,
                instruction: res.instruction,
              })
            }
          }
        )
      }
      )
    }

  }

  initializeFormGroup() {
    this.recipeForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      ingredients: new FormArray([ // this is an array of ingredients
        new FormGroup( // an object for  each individual ingredient
          {
            name: new FormControl("", [Validators.required, Validators.minLength(2)]),
            quantity: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+$')]),
            unit: new FormControl("", [Validators.required]),
          }
        )
      ]),
      instruction: new FormControl("", [Validators.required, Validators.minLength(10)]),
      image: new FormControl("", Validators.required),
    })
  }
  // Image upload
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
  // Create  a new form group for every new added ingredient
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
    if (this.isNewRecipe) {
      const newRecipe: Recipe = {
        title: this.recipeForm.get('title').value,
        description: this.recipeForm.get('description').value,
        image: this.recipeForm.get("image").value,
        ingredients: this.recipeForm.get('ingredients').value,
        instruction: this.recipeForm.get('instruction').value,
        isFavorited: false
      }
      // add new recipe to our back-end
      this._recipe.addRecipe(newRecipe).subscribe({
        next: () => {
          this.recipeForm.reset()
          this.ingredients.removeAt(1)
        },
        error: err => console.log(err)
      })
    } else {
      const newRecipe: Recipe = {
        id: this.id,
        title: this.recipeForm.get('title').value,
        description: this.recipeForm.get('description').value,
        image: this.recipeForm.get("image").value,
        ingredients: this.recipeForm.get('ingredients').value,
        instruction: this.recipeForm.get('instruction').value,
        isFavorited: false
      }
      // Update exsiting recipe
      this._recipe.updateRecipe(this.id, newRecipe).subscribe({
        next: res => console.log(res),
        error: err => console.log("there is an error:", err)
      })
    }
  }
}
