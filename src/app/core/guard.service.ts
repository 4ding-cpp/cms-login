import { Inject, Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild,
} from "@angular/router";
import { UrlService } from "../service/url.service";

@Injectable()
export class GuardService implements CanActivate {
  origin = "business";

  constructor(
    @Inject("HOST") private host: string,
    @Inject("PROTOCOL") private protocol: string,
    private router: Router,
    private urlService: UrlService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const errorUrl = '/error';
    let c = this.host.split(".");
    if (!c || !c.length || c.length < 2) return this.router.parseUrl(errorUrl);
    this.origin = c[0];
    console.log(1,this.origin)
    if (this.origin === "store") {
      let sId = route.queryParamMap.get("store");
      if (!sId) return this.router.parseUrl(errorUrl);
    }
    this.urlService.setHost(this.host);
    this.urlService.setProtocol(this.protocol);
    return true;
  }
}
