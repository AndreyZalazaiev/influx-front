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
  public chartType= 'bar';
  public chartDataReady = false;

  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
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
          this.chartDatasets.push({
            data: s.map(item => item.count),
            label: 'Stats'
          });
          s.forEach(item => this.chartLabels.push(item.name));
          this.chartDataReady = true;
        });
    }
  }

  ngOnInit(): void {
    this.loadStatsById(this.idCompany);

  }

}
