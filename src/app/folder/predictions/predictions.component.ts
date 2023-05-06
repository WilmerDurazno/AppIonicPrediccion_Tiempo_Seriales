import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { LoadingController} from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-predictions',
  templateUrl: 'predictions.component.html',
  styleUrls: ['predictions.component.scss']
})
export class PredictionsComponent {
  nacionalidad: string = '';
  mes: number = 0;
  anio: number = 0;
  predictionResult: any = null;



  constructor(public  predictionService: PredictionService,private loadingCtrl: LoadingController,) { }

  async presentLoading(duration: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Prediciendo...',
      spinner: 'crescent',
      duration: duration
    });
    await loading.present();
    return loading;
  }

  async getPrediction(): Promise<void> {
    this.predictionResult=null;
    try {
      // Realiza el proceso de registro aquí
      this.predictionService.getPrediction(this.nacionalidad, this.mes, this.anio).subscribe(result => {this.predictionResult = result;},error => {console.error('Error al obtener la predicción:', error);});
      // Por ejemplo, llama al servicio de autenticación o al servicio de registro para guardar los datos del usuario
  
      // Muestra la pantalla de carga durante 5 segundos
      const loading = await this.presentLoading(5000);
  
      // Espera a que la pantalla de carga se cierre automáticamente después de 5 segundos
      await loading.onDidDismiss();
  
      // Redirige al usuario a la página deseada después del registro exitoso
      
    } catch (error) {
      // Muestra un mensaje de error si el registro falla
      console.error('Error al registrar al usuario:', error);
    }
  
  }
 }
