import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JQ_TOKEN } from './services/jquery.service';
import { Toastr, TOASTR_TOKEN } from './services/toastr.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FacultyComponent } from './faculty/faculty.component';
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { AnswerComponent } from './answer/answer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

const jQuery = window['$'];
const toastr: Toastr = window['toastr'];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    EditProfileComponent,
    MyProfileComponent,
    FacultyComponent,
    EditFacultyComponent,
    QuestionsComponent,
    QuestionComponent,
    AnswersComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {})
  ],
  providers: [
  	{
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
