import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { State } from "./mask";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class MaskService {
  private spinnerSubject = new Subject<State>();
  private loadSubject = new Subject<State>();
  private circleSubject = new Subject<State>();

  constructor() {}

  /* Spinner */
  loadSpinner() {
    this.spinnerSubject.next(<State>{ show: true });
  }

  hideSpinner() {
    this.spinnerSubject.next(<State>{ show: false });
  }

  isSpinnerIn(): Observable<State> {
    if (!!this.spinnerSubject) {
      return this.spinnerSubject.asObservable();
    }
    return null;
  }

  /* Load */
  loadLoad() {
    this.loadSubject.next(<State>{ show: true });
  }

  hideLoad() {
    this.loadSubject.next(<State>{ show: false });
  }

  isLoadIn(): Observable<State> {
    if (!!this.loadSubject) {
      return this.loadSubject.asObservable();
    }
    return null;
  }

  /* Circle */
  loadCircle() {
    this.circleSubject.next(<State>{ show: true });
  }

  hideCircle() {
    this.circleSubject.next(<State>{ show: false });
  }

  isCircleIn(): Observable<State> {
    if (!!this.circleSubject) {
      return this.circleSubject.asObservable();
    }
    return null;
  }
}
