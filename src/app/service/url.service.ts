import { Injectable } from '@angular/core';
import { TokenDefault, LOCALCMS } from '../config';
import { LoggerService } from './logger.service';

@Injectable()
export class UrlService {
  identity = 'gn';
  identityName = 'master';
  host = '';
  protocal = '';
  hostBody = TokenDefault; //gmc222.com
  localCMS = false;

  constructor(private logger: LoggerService) {}

  setProtocol(protocal: string) {
    this.logger.print('real-protocal', protocal);
    this.protocal = protocal;
  }

  setHost(host: string) {
    this.logger.print('real-host', host);
    this.host = host;
    if (host != 'localhost') {
      let s = host.split('.');
      this.identity = s[0];
      if (s[0] === 'ag') {
        this.identityName = 'agent';
      }
      if (s[0] === 'gn') {
        this.identityName = 'master';
      }
      this.hostBody = s.splice(1).join('.'); //gmc245.com
    }
    this.logger.print('use-host', this.hostBody);
  }

  setLocalCMS(toggle: boolean) {
    this.localCMS = toggle;
  }

  getCMSHost(token: string): string {
    //跳轉到CMS
    let hostReplace = this.hostBody;
    if (this.localCMS) {
      hostReplace = LOCALCMS; //local.com:4200
    }
    let url = `${this.protocal}//${this.identity}.${hostReplace}?token=${token}`;
    this.logger.print('CMS', url);
    return url;
  }

  getLoginHost(): string {
    //拿token
    let url = `${this.protocal}//${this.identity}.${this.hostBody}/api/login/${this.identityName}`;
    this.logger.print('to Login', url);
    return url;
  }
}
