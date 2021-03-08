import {Component, Input, OnInit} from '@angular/core';
import {Recommendation} from '../domain/recommendation';
import {CompanyService} from '../service/company-service';
import {Stats} from '../domain/stats';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {
  @Input() idCompany: number;
  public recommendations: Recommendation[];
  public stats: Stats[];
  chartData: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Resource';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private companyService: CompanyService) {
  }

  public loadRecommendationsById(id): void {
    if (id) {
      this.companyService.getRecommendations(id)
        .subscribe(r => this.recommendations = r);
    }
  }

  public loadStatsById(id): void {
    if (id) {
      this.companyService.getStats(id)
        .subscribe(s => {
          this.stats = s;
          this.chartData = this.stats.map(st => [st.name, st.count]);
          console.log(this.chartData);
        });
    }
  }

  ngOnInit(): void {
    this.loadStatsById(this.idCompany);

  }

  onSelect($event: any): void {
    console.log($event);
  }
}
