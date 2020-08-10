import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AppService } from "../app.service";
import { LANG } from "../config";
import { DataService, ILogin } from "../service/data.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent {
  LANG = LANG;
  token: string;
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  langFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: AppService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.accountFormGroup = this.fb.group({
      account: ["", Validators.required],
    });
    this.passwordFormGroup = this.fb.group({
      password: ["", Validators.required],
    });
    this.langFormGroup = this.fb.group({
      lang: [this.service.getLang(), Validators.required],
    });
  }

  cccc() {
    console.log(999);
  }

  checkAccount() {
    this.dataService
      .connectCheck(this.accountFormGroup.value.account)
      .subscribe((res: Response) => {
        console.log(666, res);
        //token set
      });
  }

  getLogin(): ILogin {
    if (!this.token || !this.passwordFormGroup.value.password) return;
    let o = {
      token: this.token,
      password: this.passwordFormGroup.value.password,
    };
    return o;
  }
}
