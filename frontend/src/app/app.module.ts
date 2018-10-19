import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ChefsRepositoryService } from './chefs-repository.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TodaysSpecialsComponent } from './todays-specials/todays-specials.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { RecommendedDetailsComponent } from './recommended-details/recommended-details.component';
import { LogoutComponent } from './logout/logout.component';

// import { HttpClientInMemoryWebApiModule } from '../../../node_modules/angular-in-memory-web-api';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    SavedRecipesComponent,
    CreateUserComponent,
    UpdateProfileComponent,
    TodaysSpecialsComponent,
    RecommendedComponent,
    RecommendedDetailsComponent,
    LogoutComponent,
  ],
  providers: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule],
  imports: [
    // HttpClientInMemoryWebApiModule.forRoot(
    //   ChefsRepositoryService, { dataEncapsulation: false }
    // ),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
