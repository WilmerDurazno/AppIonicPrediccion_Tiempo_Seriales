import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { PredictionsComponent } from './folder/predictions/predictions.component';
import { PredictionService } from './services/prediction.service';
import { HttpClientModule } from '@angular/common/http';
import { FolderPage } from './folder/folder.page';
import { RegistroComponent } from './folder/registro/registro.component';
import { SesionComponent } from './folder/sesion/sesion.component';
import { ListadoComponent } from './folder/listado/listado.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    IonicModule.forRoot(),
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },PredictionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
