import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Answer, DatabaseService, Question } from '../services/database.service';
import { AuthToken } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  facultyId: number = undefined;
  questionId: number = undefined;
  answers: Answer[] = [];
  question: Question;
  auth: AuthToken;
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.checkAuthState();
    this.facultyId = this.route.snapshot.params['facultyId'];
    this.questionId = this.route.snapshot.params['question'];
    if (this.questionId !== undefined) {
      this.getAnswers(this.questionId);
      this.getQuestion(this.questionId);
    }
  }
  checkAuthState() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer)
    .subscribe((auth: AuthToken) => {
      this.auth = auth;
    });
  }
  getAnswers(id: number) {
    this.db.getQuestionAnswers(id).subscribe((answers: Answer[]) => {
      this.answers = answers;
    });
  }
  getQuestion(id: number) {
    this.db.getQuestion(id).subscribe((question: Question) => {
      this.question = question;
    });
  }
  destroyAnswer(id: number) {
    this.db.destroyAnswer(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
