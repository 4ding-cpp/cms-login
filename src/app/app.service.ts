import { Injectable, Inject } from "@angular/core";
import { LANG, LangKey } from "./config/config";
import { TranslateService } from "@ngx-translate/core";
import { UrlService } from "./service/url.service";

@Injectable()
export class AppService {
  private lang = "tw";
  LangKey = LangKey;

  constructor(public translate: TranslateService) {
    this.initLang();
  }

  initLang() {
    let arr = LANG.map((item) => {
      return item.short;
    });
    this.translate.addLangs(arr);
    if (!!localStorage.getItem(this.LangKey)) {
      this.lang = localStorage.getItem(this.LangKey);
    } else {
      localStorage.setItem(this.LangKey, this.lang);
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
