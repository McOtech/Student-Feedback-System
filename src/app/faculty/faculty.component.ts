import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatabaseService, Faculty } from '../services/database.service';
import { AuthToken } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];
  auth: AuthToken;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.checkAuthState();
    this.getFaculties();
  }
  checkAuthState() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer)
    .subscribe((auth: AuthToken) => {
      this.auth = auth;
    });
  }
  getFaculties() {
    this.db.getFaculties().subscribe((faculties: Faculty[]) => {
      this.faculties = faculties;
    });
  }
  destroyFaculty(id: number) {
    const val = confirm('Do you want to proceed?');
    if (val) {
      this.db.destroyFaculty(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

}
