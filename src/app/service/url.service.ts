import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { ApiUrl, LOCALCMS } from "../config";

@Injectable()
export class UrlService {
  ApiUrl = ApiUrl;
  LOCALCMS = LOCALCMS;
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

  cmsUrl(token: string): string {
    let url = `${this.protocal}//${ApiUrl}?token=${token}`;
    if (this.localCMS) {
      url = `http://${LOCALCMS}?token=${token}`;
    }
    this.logger.print("CMS", url);
    return url;
  }
}
