import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../domain/resource';
import {ResourceService} from '../service/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price'];
  public resources: Resource[];
  @Input() idCompany: number;

  constructor(private resourceService: ResourceService) {
  }

  public loadResourcesById(id): void {
    if (id) {
      this.resourceService.getResources(id)
        .subscribe(r => this.resources = r);
    }
  }

  ngOnInit(): void {
    this.loadResourcesById(this.idCompany);
  }

}
