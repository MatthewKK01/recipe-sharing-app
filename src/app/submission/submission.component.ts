import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';



@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {


  recipeForm: FormGroup;
  blob: string;
  formData: FormData = new FormData()

  constructor(private _recipe: RecipeService) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      ingredients: new FormControl("", Validators.required),
      image: new FormControl("", Validators.required),
    })
  }

  onImagePicked(event: any) {
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



  onSubmit() {
    const newRecipe: Recipe = {
      title: this.recipeForm.get('title').value,
      description: this.recipeForm.get('description').value,
      image: this.recipeForm.get("image").value,
      ingredients: this.recipeForm.get('ingredients').value
    }
    this._recipe.addRecipe(newRecipe).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })

  }
}
