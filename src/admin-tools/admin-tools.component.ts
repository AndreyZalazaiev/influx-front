import {Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {AdminService} from '../service/admin.service';
import {User} from '../domain/user';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {
  public selectedTab = 'Users';
  displayedColumns: string[] = ['username', 'email', 'role', 'update/delete'];
  public users: User[];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getUsers()
      .subscribe(users => this.users = users);
    setTimeout(() => {
      console.log(this.users[0].authorities);
    }, 2000);
  }

  tabClick($event: MatTabChangeEvent): void {
    this.selectedTab = $event.tab.textLabel;
  }

  deleteDialog(element: User): void {

  }

  updateDialog(element: User): void {

  }

  getAuthorities(element: User): string {
    if (element.authorities[0]) {
      return element.authorities[0].role;
    } else {
      return 'Staff';
    }
  }
}
