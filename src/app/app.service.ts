import { Injectable, Inject } from '@angular/core';
import { LANG, LangKey } from './config/config';
import { TranslateService } from '@ngx-translate/core';
import { UrlService } from './service/url.service';

@Injectable()
export class AppService {
  private lang = 'cn';
  LangKey = LangKey;

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
    let arr = LANG.map((item) => {
      return item.short;
    });
    this.translate.addLangs(arr);
    if (!!localStorage.getItem(this.LangKey)) {
      this.lang = localStorage.getItem(this.LangKey);
    }
    this.translate.use(this.lang);
  }

  getLang() {
    return this.lang;
  }

  setLang(lang: string) {
    this.lang = lang;
    localStorage.setItem(this.LangKey, lang);
    this.translate.use(lang);
  }
}
