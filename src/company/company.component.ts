import {Component, OnInit} from '@angular/core';
import {Company} from '../domain/company';
import {CompanyService} from '../service/company-service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public idSelectedCompany: number;
  public companies: Company[];

  constructor(private companyService: CompanyService) {
  }

  onCompanySelected(idSelectedCompany): void {
    this.idSelectedCompany = idSelectedCompany;
  }

  ngOnInit(): void {
    this.loadCompaniesData();
  }

  loadCompaniesData(): void {
    this.companyService.getCompanies().subscribe(c => this.companies = c);
  }
}
