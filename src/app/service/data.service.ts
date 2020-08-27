import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { APICheckUrl, APILoginUrl } from "../config";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

export interface ILogin {
  password?: string;
  phone?: string;
  email?: string;
  accountToken?: string;
  accountVF?: string;
  passwordVF?: string;
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

  connectLogin(obj: ILogin): Observable<IRes> {
    let body = {
      email: obj.accountToken || "",
      password: obj.password || "",
    };
    return this.connect(obj.passwordVF, body, APILoginUrl);
  }

  connectCheck(obj: ILogin): Observable<IRes> {
    let body = {
      phone: obj.phone || "",
      email: obj.email || "",
    };
    return this.connect(obj.accountVF, body, APICheckUrl);
  }

  connect(vf: string, body: ILogin, url: string): Observable<IRes> {
    let u = `${url}?vf=${vf}`;
    this.logger.print("http url", u);
    this.logger.print("http body", body);

    return this.http.post(u, body, this.options).pipe(
      map((res: HttpResponse<string>) => {
        this.logger.print("http response", res);
        return JSON.parse(res.body);
      }),
      catchError((err: any) => {
        let o = <IRes>{ code: err.status, value: "" };
        return of(o);
      })
    );
  }
}
