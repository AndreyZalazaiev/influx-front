import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../service/admin.service';
import {AdminToolsComponent} from '../admin-tools.component';
import {User} from '../../domain/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  idUser: number;
  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AdminToolsComponent>, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  updateUser(): void {
    if (this.formGroup.valid) {
      const u = new User();
      u.username = this.formGroup.controls['username'].value;
      u.email = this.formGroup.controls['email'].value;
      u.id = this.idUser;
      this.adminService.updateUser(u).subscribe(() => this.closeDialog());
    }
  }
}
