import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../domain/resource';
import {ResourceService} from '../service/resource.service';
import {SalesService} from '../service/sales.service';
import {Sales} from '../domain/sales';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ResourceFormComponent} from './resource-form/resource-form.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'update/delete'];
  public resources: Resource[];
  public sales: Sales[];
  @Input() idCompany: number;
  public selectedResource;

  constructor(private resourceService: ResourceService, private salesService: SalesService, private  dialog: MatDialog, private modalService: NgbModal) {
  }

  public loadResourcesById(id): void {
    if (id) {
      this.resourceService.getResources(id)
        .subscribe(r => {
          this.resources = r;
          if (this.resources.length > 0) {
            this.selectedResource = this.resources[0].id;
          }
        });
    }
  }

  ngOnInit(): void {
    this.loadResourcesById(this.idCompany);
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(ResourceFormComponent);
    dialogRef.componentInstance.idCompany = this.idCompany;
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadResourcesById(this.idCompany);
    });
  }

  updateDialog(element: Resource): void {
    const dialogRef = this.dialog.open(ResourceFormComponent);
    dialogRef.componentInstance.idResource = element.id;
    dialogRef.componentInstance.title = 'Update info';

    this.dialog.afterAllClosed.subscribe(() => {
        console.log('Reloaded');
        this.loadResourcesById(this.idCompany);
      },
      error => {
        console.log(error);
      });
  }

  deleteDialog(element: Resource): void {
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.resourceService.deleteResource(element).subscribe(() => this.loadResourcesById(this.idCompany));
        }
      })
      .catch(() => console.log('User dismissed the dialog '));
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

}
