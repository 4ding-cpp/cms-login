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

  { code: 0, name: "success" },
  { code: 9, name: "import_otp" },

  { code: 10, name: "invalid_VF" },
  { code: 11, name: "invalid_json" },
  { code: 12, name: "invalid_complete" },
  { code: 13, name: "invalid_account" },
  { code: 14, name: "invalid_account_token" },
  { code: 15, name: "invalid_password" },
  { code: 16, name: "invalid_password_token" },
  { code: 17, name: "invalid_otp" },

  { code: 21, name: "invalid_store" },
  { code: 22, name: "invalid_account_exist" },
  { code: 23, name: "invalid_password_forget" },
  { code: 24, name: "invalid_password_change" },
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
