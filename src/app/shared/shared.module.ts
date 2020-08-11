import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidationModule } from "./validation/validation.module";
import { DialogModule } from "./dialog/dialog.module";
import { TranslateModule } from "@ngx-translate/core";
import { MateriaModule } from "./materia.module";
import { NgxCaptchaModule } from "ngx-captcha";
import { MaskModule } from "./mask/mask.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ValidationModule,
    TranslateModule,
    MateriaModule,
    NgxCaptchaModule,
    MaskModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ValidationModule,
    TranslateModule,
    MateriaModule,
    NgxCaptchaModule,
    MaskModule,
  ],
  declarations: [],
})
export class SharedModule {}
