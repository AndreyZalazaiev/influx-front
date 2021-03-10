import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isOwner = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public translate: TranslateService, public authService: AuthService) {
  }


  switchLang(lang): void {
    localStorage.setItem('lang', lang);
    AuthService.language = lang;
    this.translate.use(lang);
  }

  clearAuthInfo(): void {
    this.authService.clearAuthInfo();
    this.router.navigateByUrl('login');
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    localStorage.getItem('role') === 'Owner' ? this.isOwner = true : this.isOwner = false;

    if (lang != null) {
      this.translate.use(lang);
    }
  }
}



