import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../domain/resource';
import {ResourceService} from '../service/resource.service';
import {SalesService} from '../service/sales.service';
import {Sales} from '../domain/sales';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price'];
  public resources: Resource[];
  public sales: Sales[];
  @Input() idCompany: number;

  constructor(private resourceService: ResourceService, private salesService: SalesService) {
  }

  public loadResourcesById(id): void {
    if (id) {
      this.resourceService.getResources(id)
        .subscribe(r => this.resources = r);
    }
  }

  public loadSalesById(id): void {
    if (id) {
      this.salesService.getSales(id)
        .subscribe(s => this.sales = s);
    }
  }

  ngOnInit(): void {
    this.loadResourcesById(this.idCompany);
    this.loadSalesById(this.idCompany);
  }

}
