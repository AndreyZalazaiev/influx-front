import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';
import {Sales} from '../domain/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getSales(idCompany): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${baseUrl}/sales/` + idCompany + '?lang=' + AuthService.language,
      {headers: this.authService.getToken()});
  }

  public createSale(sales: Sales): Observable<Sales> {
    return this.http.post<Sales>(`${baseUrl}/sales`, sales, {headers: this.authService.getToken()});
  }
}
