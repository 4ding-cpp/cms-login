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
  accountToken?: string;
  loginToken?: string;
  accountVF?: string;
  passwordVF?: string;
  errorcode?: number;
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

  connectLogin(obj: ILogin): Observable<string> {
    let body = {
      email: obj.accountToken || "",
      password: obj.password || "",
    };
    return this.connect(obj.passwordVF, body, LoginUrl);
  }

  connectCheck(obj: ILogin): Observable<string> {
    let body = {
      phone: obj.phone || "",
      email: obj.email || "",
    };
    return this.connect(obj.accountVF, body, CheckUrl);
  }

  connect(vf: string, body: ILogin, url: string): Observable<string> {
    let u = `${url}?vf=${vf}`;
    return this.http.post(u, body, this.options).pipe(
      map((res: HttpResponse<string>) => {
        this.logger.print("response", res);
        if (res.status !== 200) return "";
        return res.body;
      })
    );
  }
}
