import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  recipeForm!: FormGroup;

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl("",Validators.required),
      
    })
  }



  onSubmit() {
    const newRecipe = {
      id: 12,
      title: "xvanchkara"
    }
    this.http.post("http://localhost:3000/recipes", newRecipe, this.httpOptions).subscribe(
      {
        next: res => console.log(res)
      }
    )
  }
}
