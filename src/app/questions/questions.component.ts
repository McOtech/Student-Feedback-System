import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatabaseService, Question } from '../services/database.service';
import { AuthToken } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  facultyId: number;
  auth: AuthToken;
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.checkAuthState();
    this.facultyId = this.route.snapshot.params['id'];
    if (this.facultyId !== undefined) {
      this.getQuestions(this.facultyId);
    }
  }
  checkAuthState() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer)
    .subscribe((auth: AuthToken) => {
      this.auth = auth;
    });
  }
  getQuestions(facultyId: number) {
    this.db.getFacultyQuestions(facultyId).subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }
  destroyQuestion(id: number) {
    this.db.destroyQuestion(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
