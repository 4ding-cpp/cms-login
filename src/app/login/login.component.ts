import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog, MatStepper } from "@angular/material";
import { ILogin, DataService, IRes } from "../service/data.service";
import { CaptchaService } from "../service/captcha.service";
import { Subscription } from "rxjs/internal/Subscription";
import { UrlService } from "../service/url.service";
import { DialogAlertComponent } from "../shared/dialog/alert/dialog-alert.component";
import { DialogWidth } from "../config";
import { ErrorCodeService } from "../service/errorcode.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;
  subscription: Subscription;
  identityFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  token: ILogin = null;
  isLoading = "";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private urlService: UrlService,
    private dataService: DataService,
    private captcha: CaptchaService,
    private errorcodeService: ErrorCodeService
  ) {}

  ngOnInit() {
    this.init();
    this.createForm();
    if (!!this.captcha.isCaptchaIn()) {
      this.subscription = this.captcha
        .isCaptchaIn()
        .subscribe((token: ILogin) => {
          this.token = { ...this.token, ...token };
          if (!!this.accountFormGroup && !!this.token.accountVF) {
            this.setAccountToken();
          }
          if (!!this.token.passwordVF) {
            this.login();
          }
        });
    }
  }

  init() {
    this.token = {
      password: "",
      phone: "",
      email: "",
      accountToken: "",
      accountVF: "",
      passwordVF: "",
    };
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createForm() {
    this.accountFormGroup = this.fb.group({
      account: ["", Validators.required],
    });
    this.passwordFormGroup = this.fb.group({
      password: ["", Validators.required],
    });
  }

  checkAccount() {
    if (!this.accountFormGroup.value.account) return;
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let account = this.accountFormGroup.value.account;
    if (account.search(emailRule) != -1) {
      this.token.email = account;
    } else {
      this.token.phone = account;
    }
    this.isLoading = "account";
    this.captcha.getVF("signCheck");
  }

  setAccountToken() {
    this.dataService.connectCheck(this.token).subscribe((res: IRes) => {
      this.isLoading = "";
      if (!!res.code) {
        this.errorcodeService.setMsg(res.code, res.value);
        let errorName = this.errorcodeService.getMsgName(res.code);
        this.accountFormGroup.controls.account.setErrors({
          [errorName]: true,
        });
        return;
      }
      this.token.accountToken = res.value;
      this.stepper.next();
    });
  }

  checkLogin() {
    if (!this.passwordFormGroup.value.password) return;
    this.token.password = this.passwordFormGroup.value.password;
    this.isLoading = "password";
    this.captcha.getVF("signIn");
  }

  login() {
    this.dataService.connectLogin(this.token).subscribe((res: IRes) => {
      this.isLoading = "";
      if (!!res.code) {
        let code = res.code + 5;
        this.errorcodeService.setMsg(code, res.value);
        let errorName = this.errorcodeService.getMsgName(code);
        this.passwordFormGroup.controls.password.setErrors({
          [errorName]: true,
        });
        return;
      }
      window.location.href = this.urlService.cmsUrl(res.value);
    });
  }

  resetCol(ipContent: FormControl) {
    ipContent.setValue("");
  }
}
