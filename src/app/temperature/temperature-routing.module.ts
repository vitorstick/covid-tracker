import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperaturePageComponent } from './temperature-page/temperature-page.component';

const routes: Routes = [
  {
    path: '',
    component: TemperaturePageComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureRoutingModule {}
