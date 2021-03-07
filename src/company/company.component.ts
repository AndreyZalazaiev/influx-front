import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../domain/company';
import {CompanyService} from '../service/company-service';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';

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

  constructor(private companyService: CompanyService) {
  }

  onCompanySelected(idSelectedCompany): void {
    this.idSelectedCompany = idSelectedCompany;
    this.tabGroup.selectedIndex = 0;

  }


  ngOnInit(): void {
    this.loadCompaniesData();
  }

  loadCompaniesData(): void {
    this.companyService.getCompanies().subscribe(c => this.companies = c);
  }

  tabClick($event: MatTabChangeEvent): void {
    this.selectedTab = $event.tab.textLabel;
  }
}
