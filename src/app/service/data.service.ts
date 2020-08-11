import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { CheckUrl, LoginUrl } from "../config";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface ILogin {
  password?: string;
  phone?: string;
  email?: string;
  phoneToken?: string;
  emailToken?: string;
  loginToken?: string;
  accountVF?: string;
  passwordVF?: string;
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

  connectLogin(obj: ILogin): Observable<HttpResponse<string>> {
    let body = {
      email: obj.phoneToken || obj.emailToken || "",
      password: obj.password || "",
    };
    return this.connect(obj.passwordVF, body, LoginUrl);
  }

  connectCheck(obj: ILogin): Observable<HttpResponse<string>> {
    let body = {
      phone: obj.phone || "",
      email: obj.email || "",
    };
    return this.connect(obj.accountVF, body, CheckUrl);
  }

  connect(
    vf: string,
    body: ILogin,
    url: string
  ): Observable<HttpResponse<string>> {
    let u = `${url}?vf=${vf}`;
    //let headers = { "content-type": "application/json" };
    let b = JSON.stringify(body);
    console.log(u);
    return this.http.post(u, b, this.options).pipe(
      map((res: HttpResponse<string>) => {
        return res;
      })
    );
  }
}
