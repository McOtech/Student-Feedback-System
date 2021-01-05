import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JQ_TOKEN } from '../services/jquery.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(@Inject(JQ_TOKEN) private $: any) { }

  ngOnInit(): void {
    this.$('.ui.dropdown').dropdown();
  }

}
