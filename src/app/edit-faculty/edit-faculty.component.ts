import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Faculty } from '../services/database.service';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.scss']
})
export class EditFacultyComponent implements OnInit {
  id: number = undefined;
  faculty: Faculty = undefined;
  constructor(private route: ActivatedRoute, private router: Router, private db: DatabaseService) { }

  ngOnInit(): void {
    try {
      this.id = this.route.snapshot.params['id'];
      if (this.id !== undefined) {
        this.getFaculty(this.id);
      }
    } catch (error) {

    }
  }
  getFaculty(id: number) {
    this.db.getFaculty(id).subscribe((faculty: Faculty) => {
      this.faculty = faculty;
    });
  }
  saveFaculty(e) {
    e.preventDefault();
    const id = this.id;
    const name = e.target.name.value;
    const code = e.target.code.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const description = e.target.description.value;
    if (password === confirmPassword) {
      if (this.id === undefined) {
        this.db.storeFaculty({name, code, password, description}).subscribe((id: number) => {
          this.router.navigate(['/faculties']);
        });
      } else {
        this.db.updateFaculty({id, name, code, password, description}).subscribe((id: number) => {
          this.router.navigate(['/faculties']);
        });
      }
    } else {
      alert('Passwords do not match.');
    }
  }

}
