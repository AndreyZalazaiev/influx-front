import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public translate: TranslateService) {
  }

  getUserName(): string {
    return localStorage.getItem('username');
  }

  getUserEmail(): string {
    return localStorage.getItem('email');
  }

  clearAuthInfo(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  switchLang(lang): void {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    if (lang != null) {
      this.translate.use(lang);
    }
  }

}
