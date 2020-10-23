import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JQ_TOKEN } from '../services/jquery.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(@Inject(JQ_TOKEN) private $: any) { }

  ngOnInit(): void {
    this.$('.verify-btn').on('click', () => {
      this.$('.ui.small.modal').first().modal('show');
    });
  }

}
