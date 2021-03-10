import {Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {AdminService} from '../service/admin.service';
import {User} from '../domain/user';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {UserFormComponent} from './user-form/user-form.component';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {
  public selectedTab = 'Users';
  displayedColumns: string[] = ['username', 'email', 'role', 'update/delete'];
  public users: User[];

  constructor(private adminService: AdminService, private  dialog: MatDialog, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUsers()
      .subscribe(users => this.users = users);
  }

  tabClick($event: MatTabChangeEvent): void {
    this.selectedTab = $event.tab.textLabel;
  }

  deleteDialog(element: User): void {
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.adminService.deleteUser(element).subscribe(() => this.loadUsers());
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
  }

  updateDialog(element: User): void {
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.componentInstance.idUser = element.id;
    this.dialog.afterAllClosed.subscribe(() => {
        this.loadUsers();
      },
      error => {
        console.log(error);
      });
  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {size: dialogSize});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  getAuthorities(element: User): string {
    if (element.authorities[0]) {
      return element.authorities[0].role;
    } else {
      return 'Staff';
    }
  }
}
