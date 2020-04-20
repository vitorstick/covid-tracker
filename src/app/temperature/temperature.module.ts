import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material';
import { TemperaturePageComponent } from './temperature-page/temperature-page.component';
import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureDetailComponent } from './temperature-detail/temperature-detail.component';
import { CardiacDetailComponent } from './cardiac-detail/cardiac-detail.component';
import { OxigenDetailComponent } from './oxigen-detail/oxigen-detail.component';
import { ArterialDetailComponent } from './arterial-detail/arterial-detail.component';
import { GlicemicDetailComponent } from './glicemic-detail/glicemic-detail.component';
import { RespiratoryDetailComponent } from './respiratory-detail/respiratory-detail.component';
import { PainDetailComponent } from './pain-detail/pain-detail.component';

@NgModule({
  declarations: [TemperaturePageComponent, TemperatureDetailComponent, CardiacDetailComponent, OxigenDetailComponent, ArterialDetailComponent, GlicemicDetailComponent, RespiratoryDetailComponent, PainDetailComponent],
  imports: [
    CommonModule,
    TemperatureRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule
  ]
})
export class TemperatureModule {}
