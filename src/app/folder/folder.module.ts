import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule } from '@angular/router';
import { SesionComponent } from './sesion/sesion.component';
import { ListadoComponent } from './listado/listado.component';
import { HttpClientModule } from '@angular/common/http';
import { PredictionsComponent } from './predictions/predictions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [FolderPage,RegistroComponent,SesionComponent, ListadoComponent, PredictionsComponent]
})
export class FolderPageModule {}
