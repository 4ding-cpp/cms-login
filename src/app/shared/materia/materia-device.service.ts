import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class MateriaDeviceService {
  private deviceSubject = new BehaviorSubject<string>("");

  constructor() {}

  nextDevice(device: string) {
    this.deviceSubject.next(device);
  }

  isDeviceIn(): Observable<string> {
    if (!!this.deviceSubject) {
      return this.deviceSubject.asObservable();
    }
    return null;
  }
}
