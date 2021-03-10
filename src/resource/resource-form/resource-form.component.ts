import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ResourceComponent} from '../resource.component';
import {ResourceService} from '../../service/resource.service';
import {Resource} from '../../domain/resource';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {
  formGroup: FormGroup;
  idResource: number;
  idCompany: number;
  textOnBtn: string;
  title = 'Create resource';

  constructor(private dialogRef: MatDialogRef<ResourceComponent>, private resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      resourceName: new FormControl('', [Validators.required]),
      resourcePrice: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000)])
    });
    if (this.idResource != null) {
      this.textOnBtn = 'Update resource';
    } else {
      this.textOnBtn = 'Create resource';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  processResource(): void {
    if (this.idResource) {
      this.updateResource();
    } else {
      this.createResource();
    }
  }

  updateResource(): void {
    const r = new Resource();
    if (this.formGroup.valid) {
      r.id = this.idResource;
      r.name = this.formGroup.controls['resourceName'].value;
      r.price = this.formGroup.controls['resourcePrice'].value;
      this.resourceService.updateResource(r).subscribe(() => {
        this.closeDialog();
      });
    }
  }

  createResource(): void {
    const r = new Resource();
    if (this.formGroup.valid) {
      r.idCompany = this.idCompany;
      r.name = this.formGroup.controls['resourceName'].value;
      r.price = this.formGroup.controls['resourcePrice'].value;
      this.resourceService.createResource(r).subscribe(() => {
        this.closeDialog();
      });
    }
  }
}
