import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registrar Usuario', url: '/registro', icon: 'mail' },
    { title: 'Listado', url: '/listado', icon: 'paper-plane' },
    { title: 'Prediccion', url: '/predictions', icon: 'heart' },
  ];
  public labels = [];
  constructor(private navCtrl: NavController) {}
  goToPage() {
    this.navCtrl.navigateForward('folder/Inbox');
  }
}
