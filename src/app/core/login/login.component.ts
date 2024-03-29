import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
} from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
import { MatDialog, MatStepper } from "@angular/material";
import { Subscription } from "rxjs/internal/Subscription";
import { ILogin, DataService, IRes } from "../../service/data.service";
import { UrlService } from "../../service/url.service";
import { ErrorCodeService } from "../../service/errorcode.service";
import { debounceTime, take } from "rxjs/operators";
import { CaptchaService } from "../../service/captcha.service";
import { KeyupService } from "../../service/keyup.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild("stepper", { static: false }) private stepper: MatStepper;
  subscriptionCaptcha: Subscription;
  subscriptionKeyup: Subscription;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  otpFormGroup: FormGroup;

  loginUser: ILogin = null;
  isLoading = "";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private urlService: UrlService,
    private dataService: DataService,
    private captcha: CaptchaService,
    private keyupService: KeyupService,
    private errorcodeService: ErrorCodeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.init();
    this.createForm();

    if (!!this.captcha.isCaptchaIn()) {
      this.subscriptionCaptcha = this.captcha
        .isCaptchaIn()
        .subscribe((vf: ILogin) => {
          if (!!vf && !!vf.accountVF) {
            this.loginUser.accountVF = vf.accountVF;
            this.connectAccount();
          }
          if (!!vf && !!vf.passwordVF) {
            this.loginUser.passwordVF = vf.passwordVF;
            this.connectPassword();
          }
          if (!!vf && !!vf.otpVF) {
            this.loginUser.otpVF = vf.otpVF;
            this.connectOTP();
          }
        });
    }
    if (!!this.keyupService.isKeyupIn()) {
      this.subscriptionKeyup = this.keyupService
        .isKeyupIn()
        .pipe(debounceTime(1000))
        .subscribe((val: string) => {
          switch (val) {
            case "account":
              this.checkAccount();
              break;
            case "password":
              this.checkPassword();
              break;
            case "otp":
              this.checkOTP();
              break;
          }
        });
    }
  }

  init() {
    this.loginUser = {
      phone: "",
      email: "",
      password: "",
      otp: "",
      accountVF: "",
      accountToken: "",
      passwordVF: "",
      loginToken: "",
      otpVF: "",
      accountComplete: false,
      passwordComplete: false,
      accountEdit: true,
      passwordEdit: true,
    };
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (!!this.subscriptionCaptcha) {
      this.subscriptionCaptcha.unsubscribe();
    }
    if (!!this.subscriptionKeyup) {
      this.subscriptionKeyup.unsubscribe();
    }
  }

  createForm() {
    this.accountFormGroup = this.fb.group({
      account: ["", Validators.required],
    });
    this.passwordFormGroup = this.fb.group({
      password: ["", Validators.required],
    });
    this.otpFormGroup = this.fb.group({
      otp: ["", Validators.required],
    });
  }

  /* Account */
  checkAccount() {
    if (!this.accountFormGroup.value.account) return;
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let account = this.accountFormGroup.value.account;
    if (account.search(emailRule) != -1) {
      this.loginUser.email = account;
      this.loginUser.phone = "";
    } else {
      this.loginUser.phone = account;
      this.loginUser.email = "";
    }
    this.isLoading = "account";
    this.captcha.getVF("signCheck");
  }

  connectAccount() {
    this.dataService
      .connectAccount(this.loginUser, this.urlService.getStoreId())
      .pipe(take(1))
      .subscribe((res: IRes) => {
        this.isLoading = "";
        if (!!res.code) {
          this.loginUser.accountComplete = false;
          this.loginUser.accountEdit = true;
          this.loginUser.accountToken = "";
          this.setError("account", res.code, res.value);
          return;
        }
        this.setToken("accountToken", res.value);
        this.stepperNext("account");
      });
  }

  /* Password */
  checkPassword() {
    if (!this.passwordFormGroup.value.password) return;
    this.loginUser.password = this.passwordFormGroup.value.password;
    this.isLoading = "password";
    this.captcha.getVF("signIn");
  }

  connectPassword() {
    this.dataService
      .connectPassword(this.loginUser, this.urlService.getStoreId())
      .pipe(take(1))
      .subscribe((res: IRes) => {
        this.isLoading = "";
        if (!!res.code) {
          if (res.code === 9) {
            // otp
            this.setToken("loginToken", res.value);
            this.stepperNext("password");
          } else {
            this.loginUser.passwordComplete = false;
            this.loginUser.passwordEdit = true;
            this.loginUser.loginToken = "";
            this.setError("password", res.code, res.value);
          }
          return;
        }
        // login
        this.setToken("loginToken", res.value);
        this.login();
      });
  }

  /* OTP */
  checkOTP() {
    if (!this.otpFormGroup.value.otp) return;
    this.loginUser.otp = this.otpFormGroup.value.otp;
    this.isLoading = "otp";
    this.captcha.getVF("signOTP");
  }

  connectOTP() {
    this.dataService
      .connectOTP(this.loginUser, this.urlService.getStoreId())
      .pipe(take(1))
      .subscribe((res: IRes) => {
        this.isLoading = "";
        if (!!res.code) {
          this.setError("otp", res.code, res.value);
          return;
        }
        this.login();
      });
  }

  /* Other */
  resetCol(ipContent: AbstractControl) {
    if (!ipContent) return;
    ipContent.setValue("");
  }

  setError(position: string, code: number, value: string) {
    this.errorcodeService.setMsg(code, value);
    let errorName = this.errorcodeService.getMsgName(code);
    let c: AbstractControl = null;
    switch (position) {
      case "account":
        c = this.accountFormGroup.controls.account;
        break;
      case "password":
        c = this.passwordFormGroup.controls.password;
        break;
      case "otp":
        c = this.otpFormGroup.controls.otp;
        break;
    }
    if (!!c) {
      c.setErrors({
        [errorName]: true,
      });
    }
  }

  setToken(positionToken: string, value: string) {
    this.loginUser[positionToken] = value;
  }

  stepperNext(position: string) {
    switch (position) {
      case "account":
        this.loginUser.accountComplete = true;
        this.loginUser.accountEdit = false;
        break;
      case "password":
        this.loginUser.passwordComplete = true;
        this.loginUser.passwordEdit = false;
        break;
    }
    this.stepper.selected.completed = true;
    this.cdr.detectChanges();
    this.stepper.next();
  }

  stepperBack(position: string) {
    switch (position) {
      case "account":
        this.loginUser.accountComplete = false;
        this.loginUser.accountEdit = true;
        break;
    }
    this.stepper.selected.completed = false;
    this.cdr.detectChanges();
    this.stepper.previous();
  }

  login() {
    if (!this.loginUser.loginToken) return;
    window.location.href = this.urlService.cmsUrl(this.loginUser.loginToken);
  }

  onEnter(val: string) {
    this.isLoading = val;
    this.keyupService.nextKeyup(val);
  }
}
