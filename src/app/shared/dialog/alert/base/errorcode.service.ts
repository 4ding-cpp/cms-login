/*
  name matcher i18n
*/
export const ErrorCodeMsg = [
  { name: 'dialog_ip_fail', code: 10 },
  { name: 'dialog_user_fail', code: 11 },
  { name: 'dialog_account_stop', code: 12 },
  { name: 'dialog_ip_fail', code: 102 },
  { name: 'dialog_otp_fail', code: 146 },
  { name: 'dialog_password_more', code: 535 }
];

export abstract class ErrorCodeService {
  private ErrorCodeMsg = ErrorCodeMsg;

  constructor() {}

  getMsgName(errorcode: number): string {
    const result = this.ErrorCodeMsg.filter(item => item.code === errorcode);
    return !!result.length ? result[0].name : 'dialog_login_fail';
  }
}
