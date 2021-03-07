import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Visit} from '../domain/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getVisits(idCompany): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${baseUrl}/visit/` + idCompany + '?lang=' + AuthService.language,
      {headers: this.authService.getToken()});
  }
}
