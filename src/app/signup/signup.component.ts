import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private db: DatabaseService, @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  ngOnInit(): void {
  }
  registerUser(e) {
    e.preventDefault();
    const code = e.target.code.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password === confirmPassword) {
      this.db.registerUser({code, password}).subscribe((id: number) => {
        this.toastr.success('Registration successfull');
        this.router.navigate(['/signin']);
      });
    } else {
      this.toastr.error('Password do not match! try again');
    }
  }
}
