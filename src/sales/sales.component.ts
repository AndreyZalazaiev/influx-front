import {Component, Input, OnInit} from '@angular/core';
import {Sales} from '../domain/sales';
import {SalesService} from '../service/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  @Input() idCompany: number;
  public sales: Sales[];

  constructor(private salesService: SalesService) {
  }

  public loadSalesById(id): void {
    if (id) {
      this.salesService.getSales(id)
        .subscribe(s => this.sales = s);
    }
  }

  ngOnInit(): void {
    this.loadSalesById(this.idCompany);
  }

}
