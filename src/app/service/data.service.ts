import { Injectable } from "@angular/core";
import { LoggerService } from "./logger.service";
import { ApiUrl, LOCALCMS, CheckUrl, LoginUrl } from "../config";
import { Observable } from "rxjs/internal/Observable";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface ILogin {
  token?: string;
  account?: string;
  password?: string;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");

  constructor(private logger: LoggerService, private http: HttpClient) {}

  connectLogin(obj: ILogin): Observable<Response> {
    let body = {
      password: obj.password || "",
      token: obj.token || "",
    };
    return this.connect(body, LoginUrl);
  }

  connectCheck(account: string): Observable<Response> {
    let body = {
      account: account,
    };
    return this.connect(body, CheckUrl);
  }

  connect(body: ILogin, url: string): Observable<Response> {
    return this.http
      .post(CheckUrl, JSON.stringify(body), {
        headers: this.headers,
      })
      .pipe(
        map((res: Response) => {
          return res;
        })
      );
  }
}
