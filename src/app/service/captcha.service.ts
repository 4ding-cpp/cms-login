import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { ReCaptchaV3Service } from "ngx-captcha";
import { VFKEY } from "src/app/config";
import { ILogin } from './data.service';

@Injectable({
  providedIn: "root",
})
export class CaptchaService {
  private captchaSubject = new BehaviorSubject<ILogin>(null);

  constructor(private reCaptchaV3Service: ReCaptchaV3Service) {}

  nextCaptcha(captcha: ILogin) {
    console.log("captcha next", captcha);
    this.captchaSubject.next(captcha);
  }

  isCaptchaIn(): Observable<ILogin> {
    if (!!this.captchaSubject) {
      return this.captchaSubject.asObservable();
    }
    return null;
  }

  getVF(vfMode: string) {
    this.reCaptchaV3Service.execute(
      VFKEY,
      vfMode,
      (vf) => {
        let o = <ILogin>{
          accountVF: "",
          passwordVF: "",
        };

        switch (vfMode) {
          case "signIn":
            o.passwordVF = vf;
            break;
          case "signCheck":
            o.accountVF = vf;
            break;
        }
        this.nextCaptcha(o);
      },
      {
        useGlobalDomain: false,
      }
    );
  }
}
