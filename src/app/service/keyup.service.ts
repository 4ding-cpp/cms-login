import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class KeyupService {
  private keyupSubject = new BehaviorSubject<string>("");

  constructor() {}

  nextKeyup(val: string) {
    this.keyupSubject.next(val);
  }

  isKeyupIn(): Observable<string> {
    if (!!this.keyupSubject) {
      return this.keyupSubject.asObservable();
    }
    return null;
  }
}
