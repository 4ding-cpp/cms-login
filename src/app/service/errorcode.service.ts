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
  { code: 405, name: "invalidPermission" },
  { code: 101, name: "invalidConnect" },

  { code: 0, name: "access" },
  { code: 1, name: "invalid_VF" },
  { code: 2, name: "invalid_account" },
  { code: 3, name: "invalid_account" },
  { code: 4, name: "invalid_account" },
  { code: 5, name: "invalid_account" },
  { code: 6, name: "invalid_VF" },
  { code: 7, name: "invalid_password" },
  { code: 8, name: "invalid_token" },
  { code: 9, name: "invalid_password" },
];

@Injectable({
  providedIn: "root",
})
export class ErrorCodeService {
  private ErrorCodes = ErrorCodes;
  private ErrorOdd = "invalidOdd";

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
    if (i === -1) return this.ErrorOdd;
    return this.ErrorCodes[i].name;
  }

  position(code: number): number {
    return this.ErrorCodes.map((error: IErrorCode) => {
      return error.code;
    }).indexOf(code);
  }
}
