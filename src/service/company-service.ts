import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Company} from '../domain/company';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Recommendation} from '../domain/recommendation';
import {Stats} from '../domain/stats';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${baseUrl}/company`, {headers: this.authService.getToken()});
  }

  public getRecommendations(id): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${baseUrl}/stats/` + id, {headers: this.authService.getToken()});
  }

  public getStats(id): Observable<Stats[]> {
    return this.http.get<Stats[]>(`${baseUrl}/recommendation/` + id, {headers: this.authService.getToken()});
  }

}
