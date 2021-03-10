import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public login: string;
  public role: string;

  constructor() {
  }

  ngOnInit(): void {
    this.login = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
  }

}
