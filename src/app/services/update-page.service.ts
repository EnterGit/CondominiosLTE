import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePageService {
  private updatePageSubject = new Subject<void>();

  updatePageObservable = this.updatePageSubject.asObservable();

  updatePage() {
    this.updatePageSubject.next();
  }
}