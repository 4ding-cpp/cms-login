import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationModule } from './validation/validation.module';
import { DialogModule } from './dialog/dialog.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule, ValidationModule, TranslateModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule, ValidationModule, TranslateModule],
  declarations: []
})
export class SharedModule {}
