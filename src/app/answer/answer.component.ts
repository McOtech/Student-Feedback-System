import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Question } from '../services/database.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  facultyId: number = undefined;
  questionId: number = undefined;
  question: Question;
  constructor(private db: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.facultyId = this.route.snapshot.params['facultyId'];
    this.questionId = this.route.snapshot.params['question'];
    if (this.questionId !== undefined) {
      this.getQuestion(this.questionId);
    }
  }
  storeAnswers(e) {
    e.preventDefault();
    const statement = e.target.answer.value;
    const questionId = this.questionId;
    this.db.storeAnswer({questionId, statement}).subscribe(() => {
      this.router.navigate([`faculties/${ this.facultyId }/${ this.questionId }/answers`]);
    });
  }
  getQuestion(id: number) {
    this.db.getQuestion(id).subscribe((question: Question) => {
      this.question = question;
    });
  }
}
