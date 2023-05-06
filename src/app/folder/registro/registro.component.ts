import { Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exaCliente } from '../../models';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InteractionTrackerService } from '../../services/interaction-tracker.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private interactionInterval: any;
  private interactionDocId: string | undefined;

  newcliente: exaCliente = {
    id: this.firestoreService.getId(),
    nombres: '',
    apellidos: '',
    edad: '',
    genero: '',
    educacion:'',
    nacionalidad:'',
    telefono:'',
    fecha: new Date(),
    email: '',
    password: '',
    tiempo:0,
  };
  dato = this.interactionTracker.getRegistrationStartTime();
  private path = 'Clientes/';
  constructor(public firestoreService: FirestoreService,
              private interactionTracker: InteractionTrackerService,
              private router: Router,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              public firestore: AngularFirestore
              ){
                
              }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.interactionTracker.setRegistrationStartTime(Date.now());
    this.interactionInterval = setInterval(async () => {
    const currentTime = Date.now();
    const startTime = this.interactionTracker.getRegistrationStartTime();
    if (startTime) {
      const timeSpent = currentTime - startTime;
      const userId = this.newcliente.tiempo // Asegúrate de reemplazar esto con el ID de usuario real
      console.log("Hola jauan"+userId, timeSpent, this.interactionDocId+"***********")
      this.interactionDocId = await this.interactionTracker.saveInteractionTime(
        userId,
        timeSpent,
        this.interactionDocId
       
      );
    }
  }, 1000);

 
  }
  ngOnDestroy() {
    // Detén el intervalo de actualización del tiempo de interacción
    clearInterval(this.interactionInterval);
  }

  
  async onSubmit() {
    // ... Código para procesar el registro del usuario ...
  
    // Llama a setRegistrationStartTime para guardar el tiempo de inicio en una variable del servicio
    this.interactionTracker.setRegistrationStartTime(Date.now());
  
    // ... Código adicional para completar el proceso de registro ...
  
    // Llama a la función calculateElapsedTime del servicio para calcular el tiempo transcurrido desde el inicio del registro
    const elapsedTime = this.interactionTracker.calculateElapsedTime();
    console.log('Tiempo transcurrido:', elapsedTime);
  }



  async presentLoading(duration: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'crescent',
      duration: duration
    });
    await loading.present();
    return loading;
  }

  async guardarcli(){

    try {
      // Realiza el proceso de registro aquí
      this.firestoreService.createDoc(this.newcliente,this.path,this.newcliente.id)
      // Por ejemplo, llama al servicio de autenticación o al servicio de registro para guardar los datos del usuario
  
      // Muestra la pantalla de carga durante 5 segundos
      const loading = await this.presentLoading(10000);
  
      // Espera a que la pantalla de carga se cierre automáticamente después de 5 segundos
      await loading.onDidDismiss();
  
      // Redirige al usuario a la página deseada después del registro exitoso
      this.router.navigate(['/sesion']);
    } catch (error) {
      // Muestra un mensaje de error si el registro falla
      console.error('Error al registrar al usuario:', error);
    }
   
  }

}
