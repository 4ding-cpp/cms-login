import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { LocalCmsUrl } from "../config";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  LocalCmsUrl = LocalCmsUrl;
  host = "";
  protocal = "";
  local = false;
  store_id = "";
  origin = "";

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
    this.local = toggle;
  }

  setOrigin(origin: string) {
    this.origin = origin;
  }

  getOrigin() {
    return this.origin;
  }

  setStoreId(store_id: string) {
    this.store_id = store_id;
  }

  getStoreId() {
    return this.store_id;
  }

  cmsUrl(token: string): string {
    let url = '';
    if (this.local) {
      url = `http://${LocalCmsUrl}`;
    }
    url += `/?token=${token}`;
    this.logger.print("CMS", url);
    return url;
  }
}
