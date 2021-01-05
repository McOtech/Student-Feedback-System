import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';
import { AnswersComponent } from './answers/answers.component';
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FacultyComponent } from './faculty/faculty.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path: 'faculties',
    component: FacultyComponent
  },
  {
    path: 'faculties/create',
    component: EditFacultyComponent
  },
  {
    path: 'faculties/:id',
    component: EditFacultyComponent
  },
  {
    path: 'faculties/:id/questions',
    component: QuestionsComponent
  },
  {
    path: 'faculties/:facultyId/questions/:id/edit',
    component: QuestionComponent
  },
  {
    path: 'faculties/:facultyId/questions/create',
    component: QuestionComponent
  },
  {
    path: 'faculties/:facultyId/:question/answers/create',
    component: AnswerComponent
  },
  {
    path: 'faculties/:facultyId/:question/answers',
    component: AnswersComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'profile',
    component: MyProfileComponent
  },
  {
    path: 'settings',
    component: EditProfileComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/faculties'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
