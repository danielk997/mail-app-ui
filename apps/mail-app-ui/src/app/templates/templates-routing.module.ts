import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TemplatesComponent} from "./containers/templates/templates.component";
import {TemplateFormComponent} from "./containers/template-form/template-form.component";

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: TemplateFormComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
