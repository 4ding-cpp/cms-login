import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { ApiUrl, LOCALCMS } from "../config";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  ApiUrl = ApiUrl;
  LOCALCMS = LOCALCMS;
  identity = "store";
  host = "";
  protocal = "";
  localCMS = false;

  constructor(private logger: LoggerService) {}

  setProtocol(protocal: string) {
    this.logger.print("real-protocal", protocal);
    this.protocal = protocal;
  }

  setHost(host: string) {
    this.logger.print("real-host", host);
    this.host = host;
  }

  setLocalCMS(toggle: boolean) {
    this.localCMS = toggle;
  }

  setIdentity(identity:string){
    this.identity = identity
  }

  cmsUrl(token: string): string {
    let url = `${this.protocal}//${this.identity}.${ApiUrl}?token=${token}`;
    if (this.localCMS) {
      url = `http://${LOCALCMS}?token=${token}`;
    }
    this.logger.print("CMS", url);
    return url;
  }
}
