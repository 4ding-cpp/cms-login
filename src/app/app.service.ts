import { Injectable, Inject } from '@angular/core';
import { LANG, storageKey } from './config/config';
import { TranslateService } from '@ngx-translate/core';
import { UrlService } from './service/url.service';

@Injectable()
export class AppService {
  private lang = 'cn';
  storageKey = storageKey;

  constructor(
    @Inject('HOST') private host: string,
    @Inject('PROTOCOL') private protocol: string,
    public translate: TranslateService,
    private urlService: UrlService
  ) {
    this.urlService.setHost(host);
    this.urlService.setProtocol(protocol);
    this.initLang();
  }

  initLang() {
    let arr = [];
    LANG.forEach(item => {
      arr.push(item.short);
    });
    this.translate.addLangs(arr);

    if (!!localStorage.getItem(this.storageKey)) {
      this.lang = localStorage.getItem(this.storageKey);
    }
    this.translate.use(this.lang);
  }

  getDefaultLang() {
    return this.lang;
  }

  setLang(lang: string) {
    this.lang = lang;
    localStorage.setItem(this.storageKey, lang);
    this.translate.use(lang);
  }
}
