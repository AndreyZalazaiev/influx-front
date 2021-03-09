import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {CompanyComponent} from '../company.component';
import {CompanyService} from '../../service/company-service';
import {Company} from '../../domain/company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  formGroup: FormGroup;
  idCompany: number;
  textOnBtn: string;
  title = 'Create company';

  constructor(private dialogRef: MatDialogRef<CompanyComponent>, private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      companyName: new FormControl('', [Validators.required])
    });
    if (this.idCompany != null) {
      this.textOnBtn = 'Update';
    } else {
      this.textOnBtn = 'Create';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  processCompany(): void {
    console.log('#Process company');
    if (!this.idCompany) {
      this.createCompany();
    } else {
      this.updateCompany();
    }
  }

  updateCompany(): void {
    console.log('#Update company');
    const c = new Company();
    c.id = this.idCompany;
    if (this.formGroup.valid) {
      c.name = this.formGroup.controls['companyName'].value;
      this.companyService.updateCompany(c).subscribe(() => {
        this.closeDialog();
      });
    }
  }

  createCompany(): void {
    console.log('#Create company');
    const c = new Company();
    if (this.formGroup.valid) {
      c.name = this.formGroup.controls['companyName'].value;
      this.companyService.createCompany(c).subscribe(() => {
        this.closeDialog();
      });
    }
  }

}
