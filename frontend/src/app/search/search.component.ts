import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Recipe } from '../../models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('saveToFavorites', [
      state('saved', style({
        backgroundColor: 'red'
      })),
      state('unsaved', style({
        backgroundColor: 'white'
      })),
      transition('saved => unsaved', [animate('1s')]),
      transition('unsaved => saved', [animate('1s')]),
    ]),
  ],
})
export class SearchComponent {
  recipe: Recipe;
  recipes: Recipe[];
  userId: string;
  response:any;
  search: any;

  //key1: d163d5127df3dc954c85893da2da4f2e 
  //key2: 1f15f4b4b0d1f534478e53ac0e52e894
  //key3: 2ae4418069c000dc8c72aebc231c2e2d
  //key 4: 0b4cc675b862d52a9421b08556bd7217

  constructor(private httpClient: HttpClient, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSession();
    this.search = this.route
    .queryParams
    .subscribe(params => {
      this.showRecipes(params.str);
    });
  }

  showRecipes(str: string) {
    console.log("showrecipescalled: " + str)
    let url = "https://www.food2fork.com/api/search?key=0b4cc675b862d52a9421b08556bd7217&q=" + str;
    this.httpClient.get(url)
      .subscribe( (data:any) => {
        this.response = data.recipes;
        this.recipes = [];
        for(let r of this.response){
          let recipe: Recipe;
          if(this.userId){
            recipe = {
              userId : this.userId,
              JSON : r,
              saved : false
            }

            
       
      this.httpClient.get("http://ec2-18-232-121-144.compute-1.amazonaws.com:8080/lesoptimates.project2.backend/recipes/users/"+this.userId)
      .subscribe( (data:any) => {
    
          for (var i=0; i<data.length; i++){
            data[i].recipeJSON = JSON.parse(data[i].recipeJSON);
    
          }
    
          for(let sr of data){
            if(sr.recipeJSON.recipe_id == JSON.parse(JSON.stringify(recipe.JSON)).recipe_id){
              recipe.saved = true;
            }
          }
          this.recipes.push(recipe);

        });  


          }
          else{
            recipe = {
              userId : null,
              JSON : r,
              saved : true
        
            }
            this.recipes.push(recipe);
          }
        }
        console.log(this.response);
      }); 
  }

  saveRecipe(json){ 


    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
   
    this.recipe = {
      userId: this.userId,
      JSON: json,
      saved: null

    }

    let body = `userId=${this.recipe.userId}&JSON=${JSON.stringify(this.recipe.JSON)}`;

    this.httpClient.post("http://ec2-18-232-121-144.compute-1.amazonaws.com:8080/lesoptimates.project2.backend/recipes/save",body,  headers )
    .subscribe( (data:any) => {
      this.response = data.recipes;
    });

    this.ngOnInit();
  }

  getSession() {
    this.httpClient.get("http://ec2-18-232-121-144.compute-1.amazonaws.com:8080/lesoptimates.project2.backend/session", {withCredentials:true})
      .subscribe( (data:any) => {
        if(data!=null){
          this.userId = data.userId;
          console.log(this.userId);
        }
      });
  }

}
