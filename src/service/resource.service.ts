import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Resource} from '../domain/resource';
import {AuthService} from './auth-service';

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
}

