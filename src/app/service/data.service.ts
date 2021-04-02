import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { APICheckUrl, APILoginUrl, APIOTPUrl } from "../config";
import { Observable } from "rxjs/internal/Observable";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export interface ILogin {
  phone?: string;
  email?: string;
  password?: string;
  otp?: string;
  accountVF?: string;
  accountToken?: string;
  passwordVF?: string;
  loginToken?: string;
  otpVF?: string;
  accountComplete?: boolean;
  passwordComplete?: boolean;
  accountEdit?: boolean;
  passwordEdit?: boolean;
}

export interface IRes {
  code: number;
  value: string;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  headers = new HttpHeaders({
    "Content-Type": "text/json",
  });
  options = {
    headers: this.headers,
    observe: "response" as "response",
    responseType: "text" as "text",
  };

  constructor(private logger: LoggerService, private http: HttpClient) {}

  connectAccount(obj: ILogin, store_id: string): Observable<IRes> {
    let body = {
      phone: obj.phone || "",
      email: obj.email || "",
    };
    return this.connect(obj.accountVF, body, APICheckUrl, store_id);
  }

  connectPassword(obj: ILogin, store_id: string): Observable<IRes> {
    let body = {
      email: obj.accountToken || "",
      password: obj.password || "",
    };
    return this.connect(obj.passwordVF, body, APILoginUrl, store_id);
  }

  connectOTP(obj: ILogin, store_id: string): Observable<IRes> {
    let body = {
      email: obj.loginToken || "",
      password: obj.otp || "",
    };
    return this.connect(obj.otpVF, body, APIOTPUrl, store_id);
  }

  connect(
    vf: string,
    body: ILogin,
    url: string,
    store_id: string
  ): Observable<IRes> {
    let u = `${url}?vf=${vf}`;
    if (!!store_id) u = u + "&store=" + store_id;
    this.logger.print("http url", u);
    this.logger.print("http body", body);

    return this.http.post(u, body, this.options).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(err);
      }),
      map((res: HttpResponse<string>) => {
        let o = <IRes>{};
        if (res.status === 200) {
          this.logger.print("http response", res);
          o = JSON.parse(res.body);
        } else {
          this.logger.print("http error", res);
          o = { code: res.status, value: "" };
        }
        return o;
      })
    );
  }
}
