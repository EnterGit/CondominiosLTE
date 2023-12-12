import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppService } from '@services/app.service';

@Directive({
  selector: '[appShowforroles]'
})
export class ShowforrolesDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private appService: AppService
  ) { }

  @Input() set appShowforroles(role: string[]) {
    const user = this.appService.obtenerProfile();
console.log("user", user.ROLE);    
    if (user && role.includes(user.ROLE)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
