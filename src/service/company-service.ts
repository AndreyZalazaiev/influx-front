import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Company} from '../domain/company';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Stats} from '../domain/stats';
import {Recommendation} from '../domain/recommendation';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}/company`, {headers: this.authService.getToken()});
  }

  public createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${baseUrl}/company`, company, {headers: this.authService.getToken()});
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/company/` + company.id, company, {headers: this.authService.getToken()});
  }

  public deleteCompany(company: Company): Observable<any> {
    return this.http.request<any>('delete', `${baseUrl}/company/` + company.id, {headers: this.authService.getToken()});
  }

  public getRecommendations(id): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${baseUrl}/stats/` + id + '?lang=' + AuthService.language,
      {headers: this.authService.getToken()});
  }

  public getStats(id): Observable<Stats[]> {
    return this.http.get<Stats[]>(`${baseUrl}/recommendation/` + id + '?lang=' + AuthService.language,
      {headers: this.authService.getToken()});
  }

}
