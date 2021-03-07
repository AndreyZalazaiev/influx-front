import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs';
import {Resource} from '../domain/resource';
import {baseUrl} from '../environments/environment';
import {Visit} from '../domain/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  public getVisits(idCompany): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${baseUrl}/visit/` + idCompany, {headers: this.authService.getToken()});
  }
}
