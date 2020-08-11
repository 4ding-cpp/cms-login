import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog, MatStepper } from "@angular/material";
import { ILogin, DataService } from "../service/data.service";
import { CaptchaService } from "../service/captcha.service";
import { Subscription } from "rxjs/internal/Subscription";
import { UrlService } from "../service/url.service";
import { DialogAlertComponent } from "../shared/dialog/alert/dialog-alert.component";
import { DialogWidth } from "../config";
import { HttpResponse } from "@angular/common/http";

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
    private captcha: CaptchaService,
    private urlService: UrlService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.init();
    this.createForm();
    if (!!this.captcha.isCaptchaIn()) {
      this.subscription = this.captcha
        .isCaptchaIn()
        .subscribe((token: ILogin) => {
          this.token = { ...this.token, ...token };
          this.isLoading = "";
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
      loginToken: "",
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
    this.identityFormGroup = this.fb.group({
      identity: ["store", Validators.required],
    });
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
    this.dataService.connectCheck(this.token).subscribe((token: string) => {
      console.log("account token", token);
      this.token.accountToken = token
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
    this.dataService.connectLogin(this.token).subscribe((token: string) => {
      if(!token) this.dialogOpen(1);
      this.token.loginToken = token
      //login access
      this.urlService.setIdentity(this.identityFormGroup.value.identity)
      window.location.href = this.urlService.cmsUrl(token);
    });
  }

  dialogOpen(errorcode: number) {
    this.dialog.open(DialogAlertComponent, {
      width: DialogWidth,
      data: {
        errorcode: errorcode,
      },
    });
  }
}
