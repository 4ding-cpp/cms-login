import { Injectable } from "@angular/core";

/*
  name matcher i18n
  frond code:101~
*/
export interface IErrorCode {
  code: number;
  name: string;
  msg?: string;
}

const ErrorCodes: IErrorCode[] = [
  { code: 101, name: "invalidConnect" },

  { code: 0, name: "access" },
  { code: 1, name: "invalidVF" },
  { code: 2, name: "invalidAccount" },
  { code: 3, name: "invalidAccount" },
  { code: 4, name: "invalidAccount" },
  { code: 5, name: "invalidAccount" },
  { code: 6, name: "invalidVF" },
  { code: 7, name: "invalidAccount" },
  { code: 8, name: "invalidToken" },
  { code: 9, name: "invalidPassword" },
];

@Injectable({
  providedIn: "root",
})
export class ErrorCodeService {
  private ErrorCodes = ErrorCodes;

  constructor() {}

  setMsg(code: number, msg: string) {
    let i = this.position(code);
    if (i !== -1) {
      this.ErrorCodes[i].msg = msg;
    }
  }

  getMsgName(code: number): string {
    if (!code) return;
    let i = this.position(code);
    if (i === -1) {
      return "error:" + this.ErrorCodes[i].msg;
    }
    return this.ErrorCodes[i].name;
  }

  position(code: number): number {
    return this.ErrorCodes.map((error: IErrorCode) => {
      return error.code;
    }).indexOf(code);
  }
}
