import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Resource} from '../domain/resource';
import {AuthService} from './auth-service';
import {Company} from '../domain/company';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getResources(idCompany): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${baseUrl}/resource/` + idCompany + '?lang=' + AuthService.language,
      {headers: this.authService.getToken()});
  }

  public createResource(resource: Resource): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/resource`, resource, {headers: this.authService.getToken()});
  }

  public updateResource(resource: Resource): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/resource/` + resource.id, resource, {headers: this.authService.getToken()});
  }

  public deleteResource(resource: Resource): Observable<any> {
    return this.http.request<any>('delete', `${baseUrl}/resource/` + resource.id, {headers: this.authService.getToken()});
  }
}

