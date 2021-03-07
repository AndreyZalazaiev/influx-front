import {Component, Input, OnInit} from '@angular/core';
import {Recommendation} from '../domain/recommendation';
import {CompanyService} from '../service/company-service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @Input() idCompany: number;
  public recommendations: Recommendation[];

  constructor(private companyService: CompanyService) {
  }

  public loadRecommendationsById(id): void {
    if (id) {
      this.companyService.getRecommendations(id)
        .subscribe(r => this.recommendations = r);
    }
  }

  ngOnInit(): void {
    this.loadRecommendationsById(this.idCompany);
  }

}
