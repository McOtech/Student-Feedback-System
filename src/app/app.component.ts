import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JQ_TOKEN } from './services/jquery.service';
import { Toastr, TOASTR_TOKEN } from './services/toastr.service';
import { ACTION_LOGOUT } from './store/actions/auth.action';
import { AuthToken } from './store/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KSUCUMC';
  auth: AuthToken;

  constructor(
    @Inject(JQ_TOKEN) private $: any,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private store: Store
  ) {}

  ngOnInit() {
    this.checkAuthState();
    this.$('.user').popup({
      inline     : true,
      hoverable  : true,
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    });
  }
  checkAuthState() {
    this.store.select<AuthToken>((reducer: any): AuthToken => reducer.authReducer)
    .subscribe((auth: AuthToken) => {
      this.auth = auth;
    });
  }
  logoutUser() {
    this.store.dispatch({type: ACTION_LOGOUT});
  }
}
