import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Question } from '../services/database.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question = undefined;
  id: number = undefined;
  facultyId: number = undefined;
  constructor(private db: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.facultyId = this.route.snapshot.params['facultyId'];
    if (this.id !== undefined) {
      this.getQuestion(this.id);
    }
  }
  getQuestion(id: number) {
    this.db.getQuestion(id).subscribe((question: Question) => {
      this.question = question;
    });
  }
  saveQuestion(e) {
    e.preventDefault();
    const id = this.id;
    const facultyId = this.facultyId;
    const statement = e.target.question.value;
    if (id === undefined) {
      this.db.storeQuestion({facultyId, statement}).subscribe(() => {
        this.router.navigate([`/faculties/${ facultyId }/questions`]);
      });
    } else {
      this.db.updateQuestion({id, facultyId, statement}).subscribe(() => {
        this.router.navigate([`/faculties/${ facultyId }/questions`]);
      });
    }
  }
}
