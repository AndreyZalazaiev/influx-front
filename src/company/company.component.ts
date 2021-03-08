import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../domain/company';
import {CompanyService} from '../service/company-service';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {CompanyFormComponent} from './company-form/company-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public idSelectedCompany: number;
  public selectedTab = 'none';
  public companies: Company[];
  @ViewChild('tabs') tabGroup: MatTabGroup;

  constructor(private companyService: CompanyService, private  dialog: MatDialog, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadCompaniesData();
  }

  loadCompaniesData(): void {
    this.companyService.getCompanies().subscribe(c => this.companies = c);
  }

  onCompanySelected(idSelectedCompany): void {
    this.idSelectedCompany = idSelectedCompany;
    this.tabGroup.selectedIndex = 0;

  }

  tabClick($event: MatTabChangeEvent): void {
    this.selectedTab = $event.tab.textLabel;
  }

  createDialog(): void {
    this.dialog.open(CompanyFormComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadCompaniesData();
    });
  }

  updateDialog(idCompany): void {
    const dialogRef = this.dialog.open(CompanyFormComponent);
    dialogRef.componentInstance.idCompany = idCompany;
    dialogRef.componentInstance.title = 'Update info';

    this.dialog.afterAllClosed.subscribe(() => {
        console.log('Reloaded');
        this.loadCompaniesData();
      },
      error => {
        console.log(error);
      });
  }

  delete(company: Company): void {
    this.confirm('Please confirm', 'Do you really want to delete ?')
      .then((confirmed) => {
        if (confirmed) {
          this.companyService.deleteCompany(company).subscribe(() => this.loadCompaniesData());
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
