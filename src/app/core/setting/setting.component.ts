import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { UrlService } from "../../service/url.service";
import { DataService, IRes } from "../../service/data.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"],
})
export class SettingComponent implements OnInit {
  register = '';
  errorMsg = '';

  constructor(private route: ActivatedRoute, private dataService: DataService, private urlService: UrlService, private router: Router,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!!params && !!params.register) {
        this.register = params.register
      }
      if (!!this.register) {
        this.connect();
      }else{
        this.error();
      }
    });
  }

  connect() {
    this.dataService.connectRegister(this.register)
      .pipe(take(1))
      .subscribe((res: IRes) => {
        if (!!res.code) {
          if (res.code === 40) {
            this.connect();
          } else {
            this.error();
          }
        } else {
          this.login(res.value);
        }
      });
  }

  login(token: string) {
    if (!token) return;
    window.location.href = this.urlService.cmsUrl(token);
  }

  error() {
    this.errorMsg = 'errorMsg'
  }

  loginIn() {
    this.router.navigate(['in']);
  }
}
