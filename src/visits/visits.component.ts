import {Component, Input, OnInit} from '@angular/core';
import {VisitService} from '../service/visit.service';
import {Visit} from '../domain/visit';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  @Input() idCompany: number;
  public visits: Visit[];

  constructor(private visitService: VisitService) {
  }

  public loadVisitsById(id): void {
    if (id) {
      this.visitService.getVisits(id)
        .subscribe(v => this.visits = v);
    }
  }

  ngOnInit(): void {
    this.loadVisitsById(this.idCompany);
  }

}
