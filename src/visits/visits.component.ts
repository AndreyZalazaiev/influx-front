import {Component, Input, OnInit} from '@angular/core';
import {VisitService} from '../service/visit.service';
import {Visit} from '../domain/visit';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  @Input() idCompany: number;
  public visits: Visit[];
  public sortedData: Visit[];

  constructor(private visitService: VisitService) {

  }

  public loadVisitsById(id): void {
    if (id) {
      this.visitService.getVisits(id)
        .subscribe(v => {
          this.visits = v;
          this.sortedData = this.visits.slice();
        });
    }
  }

  ngOnInit(): void {
    this.loadVisitsById(this.idCompany);
  }

  sortData(sort: Sort) {
    const data = this.visits.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.compare(a.count, b.count, isAsc);
        case 'count':
          return this.compare(a.count, b.count, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
