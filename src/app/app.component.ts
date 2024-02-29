import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe-sharing-app';
  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:3000/recipes").subscribe(
      {
        next: res => console.log(res),
        error: err => console.log(err),

      }
    )
  }
  
}
