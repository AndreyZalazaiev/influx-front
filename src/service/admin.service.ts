import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../domain/company';
import {baseUrl} from '../environments/environment';
import {User} from '../domain/user';
import {AuthService} from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/user`, {headers: this.authService.getToken()});
  }

  public updateUser(user: User): Observable<Company> {
    return this.http.put<Company>(`${baseUrl}/user/` + user.id, user, {headers: this.authService.getToken()});
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.request<any>('delete', `${baseUrl}/user/` + user.id, {headers: this.authService.getToken()});
  }

}
