import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DatabaseService } from '../services/database.service';
import { JQ_TOKEN } from '../services/jquery.service';
import { Toastr, TOASTR_TOKEN } from '../services/toastr.service';
import { ACTION_LOGIN } from '../store/actions/auth.action';
import { AuthToken } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    @Inject(JQ_TOKEN) private $: any,
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.$('.ui.dropdown').dropdown({
      // values:
      onChange: (value, text, $choice) => {
        this.$('#category').val(value);
      }
    });
  }
  login(e) {
    e.preventDefault();
    const category = e.target.category.value;
    const code = e.target.code.value;
    const password = e.target.password.value;
    this.db.loginUser({category, code, password}).subscribe((status: AuthToken) => {
      if (status.status === true) {
        this.store.dispatch({type: ACTION_LOGIN, ...status});
        this.toastr.success('Login Success');
        this.router.navigate(['']);
      } else {
        this.toastr.error('Invalid credentials. Try again');
      }
    });
  }
}
